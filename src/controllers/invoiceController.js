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
      const { NoteInvoice, Shipper } = req.body;
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
        return res
          .status(200)
          .json({ error: true, message: "Không có sản phẩm trong giỏ hàng" });
      }
      let total = 0;
      for (let i = 0; i < cartItems.length; i++) {
        const { Product, CartProductQuantity, CartProductSize } = cartItems[i];
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
          return res
            .status(200)
            .json({ error: true, message: "Sản phẩm không đủ số lượng tồn" });
        }
      }
      let a = parseInt(Shipper);
      // thêm mới hóa đơn
      const invoice = new Invoice({
        InvoiceNameReceiver: account.FullName,
        InvoiceAddressReceiver: account.AddressUser,
        InvoicePhoneReceiver: account.PhoneNumber,
        InvoiceDate: new Date(),
        TotalInvoice: total + a,
        Shipper,
        StatusInvoice: false,
        Paid: false,
        NoteInvoice,
        AccountID: id,
      });
      // lưu hóa đơn vào database
      const b = await invoice.save();

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
      await Cart.deleteMany({ Account: id });
      res.status(200).json({
        error: false,
        message: "Đặt hàng thành công!",
        invoice: {
          id: invoice._id,
          InvoiceNameReceiver: b.FullNbme,
          InvoicebddressReceiver: b.AddressUser,
          InvoicePhoneReceiver: b.PhoneNumber,
          InvoiceDate: b.InvoiceDate,
          TotalInvoice: b.TotalInvoice,
          Shipper: b.Shipper,
          StatusInvoice: b.StatusInvoice,
          Paid: b.Paid,
          NoteInvoice: b.NoteInvoice,
          AccountID: b.AccountID,
        },
      });
    } catch (error) {
      res.status(200).json({ error: true, message: error.message });
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
      const sortedInvoices = formattedInvoices.sort((a, b) => {
        return moment(b.InvoiceDate, "DD/MM/YYYY").diff(moment(a.InvoiceDate, "DD/MM/YYYY"));
      });
      res.json(sortedInvoices);
    } catch (error) {
      res.status(200).json({ error: error.message });
    }
  },
  //get Invoice History By CustomerId
  getInvoiceDetailByInvoiceId: async (req, res) => {
    try {
      const InvoiceID = req.params.InvoiceID;
      const invoices = await InvoiceDetails.find({InvoiceID: InvoiceID,}).populate("_id");
      const formattedInvoices = [];
      for (const invoice of invoices) {
        const size = await SizeProduct.findOne({_id: invoice.SizeProductID,});
        const fmsize = {id: size._id,size: size.TenSize,};
        const allProducts = await Product.findOne({_id: invoice.ProductID,}).populate({path: "ProductType",populate: { path: "Sex" },}).populate({ path: "ImageProduct" });
        const allProduct = {
          id: allProducts._id,
          NameProduct: allProducts.NameProduct,
          PriceProduct: allProducts.PriceProduct,
          ImageProduct: {
            id: allProducts.ImageProduct._id,
            TenHinh: allProducts.ImageProduct.TenHinh,
            DuongDanHinh: allProducts.ImageProduct.DuongDanHinh,
          },
          Description: allProducts.Description,
          StatusProduct: allProducts.StatusProduct,
          CreateDate: moment(allProducts.CreateDate)
            .tz("Asia/Ho_Chi_Minh")
            .format("YYYY-MM-DD HH:mm:ss"),
          UpdateDate: moment(allProducts.UpdateDate)
            .tz("Asia/Ho_Chi_Minh")
            .format("YYYY-MM-DD HH:mm:ss"),
          ProductType: {
            id: allProducts.ProductType._id,
            NameProductType: allProducts.ProductType.NameProductType,
            Sex: {
              id: allProducts.ProductType.Sex[0]._id,
              NameSex: allProducts.ProductType.Sex[0].NameSex,
            },
          },
        };
        formattedInvoices.push({
          id: invoice._id,
          TenSize: fmsize.size,
          InvoiceID: invoice.InvoiceID,
          Quantity: invoice.Quantity,
          UnitPrice: invoice.UnitPrice,
          Product: allProduct,
        });
      }
      res.json(formattedInvoices);
    } catch (error) {
      res.status(200).json({ error: error.message });
    }
  },
  
};

module.exports = invoiceController;
