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

const useController = {
  //Thêm Size sản phẩm
  addSizeProduct: async (req, res) => {
    try {
      const newSize = new SizeProduct(req.body);
      const savedSize = await newSize.save();
      res.status(200).json(savedSize);
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },
  //Lấy tất cả size
  getAllSize: async (req, res) => {
    try {
      const allSize = await SizeProduct.find();
      res.status(200).json(allSize);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = useController;
