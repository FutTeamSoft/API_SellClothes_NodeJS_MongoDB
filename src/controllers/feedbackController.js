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
  
  const feedbackController = {
    //Thêm Size sản phẩm
    addFeedback: async (req, res) => {
      try {
        const newFeedback = new FeedBack(req.body);
        const savedFeedback = await newFeedback.save();
        res.status(200).json(savedFeedback);
      } catch (err) {
        res.status(500).json(err); //HTTP REQUEST CODE
      }
    },
    //Lấy tất cả size
    getFeedback: async (req, res) => {
      try {
        const allFeedback = await FeedBack.find();
        res.status(200).json(allFeedback);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  };
  
  module.exports = feedbackController;
  