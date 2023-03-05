const {
    Sex,
    ProductType,
    Product,
    ProductDetail,
    SizeProduct,
    AdminAccount,
    FeedBack,
    Account,
    Invoice,
    InvoiceDetails,
  } = require("../models/model.js");
  const invoiceController = {
    createInvoice :async (req, res) => {
        try {
          const {
            InvoiceNameReceiver,
            InvoiceAddressReceiver,
            InvoicePhoneReceiver,
            InvoiceDate,
            TotalInvoice,
            PaymentsInvoice,
            StatusInvoice,
            Paid,
            NoteInvoice,
            AccountID,
            products, // là mãng chứa chi tiết sản phẩm 
          } = req.body;
      
          // Create a new invoice
          const invoice = new Invoice({
            InvoiceNameReceiver,
            InvoiceAddressReceiver,
            InvoicePhoneReceiver,
            InvoiceDate,
            TotalInvoice,
            PaymentsInvoice,
            StatusInvoice:false,
            Paid:false,
            NoteInvoice,
            AccountID,
          });
      
          // lưu hóa đơn vào database
          await invoice.save();
      
          // lặp lại để thêm chi tiết vào hóa đơn vì mối hóa đơn có nhiều chi tiết
          for (let i = 0; i < products.length; i++) {
            const { ProductID, SizeProductID, Quantity, UnitPrice } = products[i];//lấy giá trị theo từng chi tiết hóa đơn
      
            // thêm chi tiết hóa đơn
            const invoiceDetail = new InvoiceDetails({
              ProductID,
              SizeProductID,
              Quantity,
              UnitPrice,
              InvoiceID: invoice._id,
            });
            // lưu chi tiết hóa đơn
            await invoiceDetail.save();
          }
      
          res.status(200).json({ message: 'Đặt hàng thành công!' });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
  };
  
  module.exports = invoiceController;
  