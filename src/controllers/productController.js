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
const productController = {
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
  //Get All Product
  getAllProduct: async (req, res) => {
    try {
      const allProduct = await Product.find();
      res.status(200).json(allProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Add Product
  addProduct: async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Get All Sex
  getAllSex: async (req, res) => {
    try {
      const allSex = await Sex.find();
      res.status(200).json(allSex);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Add Sex
  addSex: async (req, res) => {
    try {
      const newSex = new Sex(req.body);
      const saveSex = await newSex.save();
      res.status(200).json(saveSex);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Get All Product Type
  getAllProductType: async (req, res) => {
    try {
      const allProductType = await ProductType.find();
      res.status(200).json(allProductType);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Add Product Type
  addProductType: async (req, res) => {
    try {
      const newProductType = new ProductType(req.body);
      const saveProductType = await newProductType.save();
      res.status(200).json(saveProductType);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Get All Product By ID Sex
  getAllProductBySex: async (req, res) => {
    try {
      const idSex = req.params.idSex;
      const allProductByIdSex = await Product.find(idSex);
      res.status(200).json(allProductByIdSex);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //get product latest flow quality
  getProductsByquality : async (req, res) => {
    try {
      const quality = parseInt(req.params.quality); // lấy giá trị limit từ req.params
      const products = await Product.find({ StatusProduct: 1 })//tìm sản phẩm đang còn hàng
        .sort({ CreateDate: -1 })
        .limit(quality);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = productController;
