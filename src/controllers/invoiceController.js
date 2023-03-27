const {
  Sex,
  ProductType,
  Product,
  ProductDetail,
  SizeProduct,
  AdminAccount,
  FeedBack,
  Cart,
  Account,
  Invoice,
  InvoiceDetails,
} = require("../models/model.js");
const moment = require("moment");
const invoiceController = {
  createInvoice: async (req, res) => {
    try {
      const id = req.params.id;
      const { PaymentsInvoice, NoteInvoice } = req.body;
      const account = await Account.findById(id);
      const cartItems = await Cart.find({ Account: id })
        .populate({
          path: "Product",
          populate: [
            { path: "ProductType", populate: { path: "Sex" } },
            { path: "ImageProduct" },
          ],
        })
        .populate({ path: "Account" });
      // kiểm tra xem giỏ hàng có sản phẩm hay không
      if (cartItems.length === 0) {
        return res.status(200).json({ message: "Không có sản phẩm trong giỏ hàng" });
      }
      let total = 0;
      for (let i = 0; i < cartItems.length; i++) {
        const { Product, CartProductQuantity,CartProductSize } = cartItems[i];
        const totalPrice = Product.PriceProduct * CartProductQuantity;
        total += totalPrice;

        const sizeProduct = await SizeProduct.findOne({
          TenSize: CartProductSize,
        });

        // Lấy SizeProductID từ SizeName bằng với CartProductSize
        const sizeProductId = sizeProduct._id;

        const productDetail = await ProductDetail.findOne({
          SizeProduct: sizeProductId,
        });

        if (!productDetail || productDetail.SoLuongTon < CartProductQuantity) {
          return res.status(200).json({ message: "Sản phẩm không đủ số lượng tồn" });
        }
      }

      // thêm mới hóa đơn
      const invoice = new Invoice({
        InvoiceNameReceiver: account.FullName,
        InvoiceAddressReceiver: account.AddressUser,
        InvoicePhoneReceiver: account.PhoneNumber,
        InvoiceDate: new Date(),
        TotalInvoice: total,
        PaymentsInvoice,
        StatusInvoice: false,
        Paid: false,
        NoteInvoice,
        AccountID: AccountID,
      });

      // lưu hóa đơn vào database
      await invoice.save();

      // lặp lại để thêm chi tiết vào hóa đơn vì mỗi hóa đơn có nhiều chi tiết
      for (let i = 0; i < cartItems.length; i++) {
        const cartItem = cartItems[i];
        const { Product, CartProductQuantity } = cartItem;
        const { PriceProduct } = Product;
        const sizeProduct = await SizeProduct.findOne({
          TenSize: cartItem.CartProductSize,
        });

        // Lấy SizeProductID từ SizeName bằng với CartProductSize
        const sizeProductId = sizeProduct._id;

        const productDetail = await ProductDetail.findOne({
          SizeProduct: sizeProductId,
        });

        if (productDetail) {
          productDetail.SoLuongTon -= CartProductQuantity;
          await productDetail.save();
        }

        // Thêm chi tiết hóa đơn
        const invoiceDetail = new InvoiceDetails({
          ProductID: Product,
          SizeProductID: sizeProductId,
          Quantity: CartProductQuantity,
          UnitPrice: PriceProduct,
          InvoiceID: invoice._id,
        });

        // Lưu chi tiết hóa đơn vào database
        await invoiceDetail.save();
      }

      // Xóa các chi tiết trong giỏ hàng đã được thêm vào hóa đơn
      await Cart.deleteMany({ Account: AccountID });
      res.status(200).json({ message: "Đặt hàng thành công!" });
    } catch (error) {
      res.status(200).json({ message: error.message });
    }
  },
  //get all invoice
  getAllInvoices: async (req, res) => {
    try {
      const allinvoices = await Invoice.find().lean();
      const invoices = allinvoices.map((invoice) => ({
        id: invoice._id,
        InvoiceNameReceiver: invoice.InvoiceNameReceiver,
        InvoiceAddressReceiver: invoice.InvoiceAddressReceiver,
        InvoicePhoneReceiver: invoice.InvoicePhoneReceiver,
        InvoiceDate: moment(invoice.InvoiceDate).format("DD/MM/YYYY"),
        TotalInvoice: invoice.TotalInvoice,
        PaymentsInvoice: invoice.PaymentsInvoice,
        StatusInvoice: invoice.StatusInvoice,
        Paid: invoice.Paid,
        NoteInvoice: invoice.NoteInvoice,
        AccountID: invoice.AccountID,
      }));
      res.json(invoices);
    } catch (error) {
      res.status(200).json({ error: error.message });
    }
  },
  //update status invoice
  updateInvoiceStatus: async (req, res) => {
    try {
      const invoiceId = req.params.invoiceId; //lấy id invoice
      const { StatusInvoice } = req.body;

      const currentInvoice = await Invoice.findById(invoiceId);
      const updatedStatus = !currentInvoice.StatusInvoice;
      const updatedInvoice = await Invoice.findByIdAndUpdate(
        invoiceId,
        { StatusInvoice: updatedStatus },
        { new: true }
      );
      res.json({
        id: updatedInvoice._id,
        InvoiceNameReceiver: updatedInvoice.InvoiceNameReceiver,
        InvoiceAddressReceiver: updatedInvoice.InvoiceAddressReceiver,
        InvoicePhoneReceiver: updatedInvoice.InvoicePhoneReceiver,
        InvoiceDate: moment(updatedInvoice.InvoiceDate).format("DD/MM/YYYY"),
        TotalInvoice: updatedInvoice.TotalInvoice,
        PaymentsInvoice: updatedInvoice.PaymentsInvoice,
        StatusInvoice: updatedInvoice.StatusInvoice,
        Paid: updatedInvoice.Paid,
        NoteInvoice: updatedInvoice.NoteInvoice,
        AccountID: updatedInvoice.AccountID,
      });
    } catch (error) {
      res.status(200).json({ error: error.message });
    }
  },
  //update status invoice
  updateInvoicePaid: async (req, res) => {
    try {
      const invoiceId = req.params.invoiceId;
      const { Paid } = req.body;
      const currentInvoice = await Invoice.findById(invoiceId);
      const updatedPaid = !currentInvoice.Paid; // chuyển trạng thái để đưa vào db
      const updatedInvoice = await Invoice.findByIdAndUpdate(
        invoiceId,
        { Paid: updatedPaid },
        { new: true }
      );
      res.json({
        id: updatedInvoice._id,
        InvoiceNameReceiver: updatedInvoice.InvoiceNameReceiver,
        InvoiceAddressReceiver: updatedInvoice.InvoiceAddressReceiver,
        InvoicePhoneReceiver: updatedInvoice.InvoicePhoneReceiver,
        InvoiceDate: moment(updatedInvoice.InvoiceDate).format("DD/MM/YYYY"),
        TotalInvoice: updatedInvoice.TotalInvoice,
        PaymentsInvoice: updatedInvoice.PaymentsInvoice,
        StatusInvoice: updatedInvoice.StatusInvoice,
        Paid: updatedInvoice.Paid,
        NoteInvoice: updatedInvoice.NoteInvoice,
        AccountID: updatedInvoice.AccountID,
      });
    } catch (error) {
      res.status(200).json({ error: error.message });
    }
  },
  //get Invoice History By CustomerId
  getInvoiceHistoryByCustomerId: async (req, res) => {
    try {
      const id = req.params.id;
      const invoices = await Invoice.find({ AccountID: id });

      const formattedInvoices = invoices.map((invoice) => {
        return {
          id: invoice._id,
          InvoiceNameReceiver: invoice.InvoiceNameReceiver,
          InvoiceAddressReceiver: invoice.InvoiceAddressReceiver,
          InvoicePhoneReceiver: invoice.InvoicePhoneReceiver,
          InvoiceDate: moment(invoice.InvoiceDate).format("DD/MM/YYYY"),
          TotalInvoice: invoice.TotalInvoice,
          PaymentsInvoice: invoice.PaymentsInvoice,
          StatusInvoice: invoice.StatusInvoice,
          Paid: invoice.Paid,
          NoteInvoice: invoice.NoteInvoice,
          AccountID: invoice.AccountID,
        };
      });

      res.json(formattedInvoices);
    } catch (error) {
      res.status(200).json({ error: error.message });
    }
  },
  //get Invoice History By CustomerId
  getInvoiceDetailByInvoiceId: async (req, res) => {
    try {
      const InvoiceID = req.params.InvoiceID;
      const invoices = await InvoiceDetails.find({ InvoiceID: InvoiceID });

      const formattedInvoices = invoices.map((invoice) => {
        return {
          id: invoice._id,
          SizeProductID: invoice.SizeProductID,
          ProductID: invoice.ProductID,
          InvoiceID: invoice.InvoiceID,
          Quantity: invoice.Quantity,
          UnitPrice: invoice.UnitPrice,
        };
      });

      res.json(formattedInvoices);
    } catch (error) {
      res.status(200).json({ error: error.message });
    }
  },
};

module.exports = invoiceController;
