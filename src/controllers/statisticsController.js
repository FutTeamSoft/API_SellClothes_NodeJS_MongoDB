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
  const statisticsController = {
    //đếm số lượng sản phẩm 
    getProductStatistics: async (req, res) => {
      try {
        const productCount = await Product.countDocuments();
        res.status(200).json({ productCount });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Lỗi truy xuất" });
      }
      },
      //số lượng tài khoản 
      getAccountStatistics : async (req, res) => {
        try {
          const accountCount = await Account.countDocuments();
          res.status(200).json({ accountCount });
        } catch (error) {
          console.log(error);
        res.status(500).json({ message: "Lỗi truy xuất" });
      }},
      //số lượng hóa đơn
      getInvoiceStatistics : async (req, res) => {
        try {
          const InvoiceCount = await Invoice.countDocuments();
          res.status(200).json({ InvoiceCount });
        } catch (error) {
        console.log(error);
          res.status(500).json({ message: "Lỗi truy xuất" });
        }
      },
      //thống kê tổng doanht hu ước tính và doanh thu thực tế
      getRevenueStatistics : async (req, res) => {
      try {
        const invoices = await Invoice.find({});
        const totalRevenue = invoices.reduce((acc, invoice) => acc + invoice.TotalInvoice,0);
        const actualRevenue = invoices.reduce((acc, invoice) => invoice.Paid === 1 ? acc - invoice.TotalInvoice : acc,totalRevenue);
        res.status(200).json({ totalRevenue, actualRevenue });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Lỗi truy xuất" });
      }
      },
      //số lượng đơn hàng chưa xữ lý và đã xữ lý
      getProcessedInvoiceStatistics : async (req, res) => {
        try {
          const processedInvoice = await Invoice.countDocuments({Paid:1});
          const unprocesseddInvoice = await Invoice.countDocuments({Paid:0});
          res.status(200).json({ processedInvoice,unprocesseddInvoice });
        } catch (error) {
          console.log(error);
        res.status(500).json({ message: "Lỗi truy xuất" });
      }},
  };
  
  module.exports = statisticsController;
  