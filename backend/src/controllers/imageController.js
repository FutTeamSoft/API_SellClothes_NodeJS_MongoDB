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
  ImageProduct,
  InvoiceDetails,
} = require("../models/model.js");
const fs = require("fs");
const imageController = {
  //Thêm Size sản phẩm
  addImageProduct: async (req, res) => {
    try {
      const newImg = new ImageProduct(req.body);
      const savedImg = await newImg.save();
      res.status(200).json(savedImg);
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },
  //Get All Image
  getAllImage: async (req, res) => {
    try {
      const allImage = await ImageProduct.find();
      res.status(200).json(allImage);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Delete Image By ID
  delImgByID: async (req, res) => {
    try {
      const id = req.params.IDImage;
      await ImageProduct.deleteOne({ _id: id }).exec();
      res.status(200).json({ message: "Xóa hình thành công" });
    } catch (err) {
      res.status(500).json({ message: "Xóa hình thất bại" });
    }
  },
};
module.exports = imageController;
