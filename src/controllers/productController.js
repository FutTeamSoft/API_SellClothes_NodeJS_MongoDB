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
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Ho_Chi_Minh");
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
      const allProducts = await Product.find().populate({
        path: "ProductType",
        populate: { path: "Sex" },
      });
      const allProduct = allProducts.map((product) => ({
        id: product._id,
        NameProduct: product.NameProduct,
        PriceProduct: product.PriceProduct,
        ImageProduct: product.ImageProduct,
        Description: product.Description,
        StatusProduct: product.StatusProduct,
        CreateDate: moment(product.CreateDate)
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY-MM-DD HH:mm:ss"),
        UpdateDate: moment(product.UpdateDate)
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY-MM-DD HH:mm:ss"),
        ProductType: {
          id: product.ProductType._id,
          NameProductType: product.ProductType.NameProductType,
          Sex: {
            id: product.ProductType.Sex[0]._id,
            NameSex: product.ProductType.Sex[0].NameSex,
          },
        },
      }));
      res.status(200).json(allProduct);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  //Get All Product Detail
  getAllProductDetail: async (req, res) => {
    try {
      const allProductDetails = await ProductDetail.find()
        .populate({
          path: "Product",
          populate: { path: "ProductType", populate: { path: "Sex" } },
        })
        .populate({ path: "SizeProduct" });

      const allproductdl = allProductDetails.map((allproduct) => ({
        id: allproduct._id,
        Product: {
          id: allproduct.Product._id,
          NameProduct: allproduct.Product.NameProduct,
          PriceProduct: allproduct.Product.PriceProduct,
          ImageProduct: allproduct.Product.ImageProduct,
          Description: allproduct.Product.Description,
          StatusProduct: allproduct.Product.StatusProduct,
          CreateDate: moment(allproduct.Product.CreateDate)
            .tz("Asia/Ho_Chi_Minh")
            .format("YYYY-MM-DD HH:mm:ss"),
          UpdateDate: moment(allproduct.Product.UpdateDate)
            .tz("Asia/Ho_Chi_Minh")
            .format("YYYY-MM-DD HH:mm:ss"),
          ProductType: {
            id: allproduct.Product.ProductType._id,
            NameProductType: allproduct.Product.ProductType.NameProductType,
            Sex: {
              id:
                allproduct.Product.ProductType.Sex.length > 0
                  ? allproduct.Product.ProductType.Sex[0]._id
                  : null,
              NameSex:
                allproduct.Product.ProductType.Sex.length > 0
                  ? allproduct.Product.ProductType.Sex[0].NameSex
                  : null,
            },
          },
        },
        SizeProduct: {
          id: allproduct.SizeProduct._id,
          TenSize: allproduct.SizeProduct.TenSize,
        },
        SoLuongTon: allproduct.SoLuongTon,
      }));

      res.status(200).json(allproductdl);
    } catch (err) {
      res.status(500).json(err.message);
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
      const allSex = await (
        await Sex.find().lean()
      ).map((allSex) => ({
        id: allSex._id,
        NameSex: allSex.NameSex,
      }));
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
      const allProductType = await ProductType.find()
        .lean()
        .populate({
          path: "Sex",
        })
        .exec();
      const productTypes = allProductType.map((productType) => ({
        id: productType._id,
        NameProductType: productType.NameProductType,
        Sex: {
          id: productType.Sex.length > 0 ? productType.Sex[0]._id : null,
          NameSex:
            productType.Sex.length > 0 ? productType.Sex[0].NameSex : null,
        },
      }));
      res.status(200).json(productTypes);
    } catch (err) {
      res.status(500).json(err.message);
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
  //Get All Product By Name Sex
  getAllProductBySex: async (req, res) => {
    try {
      const NameSex = req.params.NameSex;
      const sex = await Sex.findOne({ NameSex }).lean();
      const productTypes = await ProductType.find({ Sex: sex._id }).lean();
      const products = await Product.find({
        ProductType: { $in: productTypes },
      }).populate({
        path: "ProductType",
        populate: {
          path: "Sex",
        },
      });
      const productBySex = products.map((product) => ({
        id: product._id,
        NameProduct: product.NameProduct,
        PriceProduct: product.PriceProduct,
        ImageProduct: product.ImageProduct,
        Description: product.Description,
        StatusProduct: product.StatusProduct,
        CreateDate: moment(product.CreateDate)
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY-MM-DD HH:mm:ss"),
        UpdateDate: moment(product.UpdateDate)
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY-MM-DD HH:mm:ss"),
        ProductType: {
          id: product.ProductType !== null ? product.ProductType._id : null,
          NameProductType:
            product.ProductType !== null
              ? product.ProductType.NameProductType
              : null,
          Sex: {
            id:
              product.ProductType && product.ProductType.Sex
                ? product.ProductType.Sex[0]._id
                : null,
            NameSex:
              product.ProductType && product.ProductType.Sex
                ? product.ProductType.Sex[0].NameSex
                : null,
          },
        },
      }));
      res.status(200).json(productBySex);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  //Get All Product By ID_Sex
  getAllProductByIDSex: async (req, res) => {
    try {
      const ID_Sex = req.params.IDSex;
      const sex = await Sex.findOne({ ID_Sex }).lean();
      const productTypes = await ProductType.find({ Sex: sex._id }).lean();
      const products = await Product.find({
        ProductType: { $in: productTypes },
      }).populate({
        path: "ProductType",
        populate: {
          path: "Sex",
        },
      });
      const productBySex = products.map((product) => ({
        id: product._id,
        NameProduct: product.NameProduct,
        PriceProduct: product.PriceProduct,
        ImageProduct: product.ImageProduct,
        Description: product.Description,
        StatusProduct: product.StatusProduct,
        CreateDate: moment(product.CreateDate)
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY-MM-DD HH:mm:ss"),
        UpdateDate: moment(product.UpdateDate)
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY-MM-DD HH:mm:ss"),
        ProductType: {
          id: product.ProductType !== null ? product.ProductType._id : null,
          NameProductType:
            product.ProductType !== null
              ? product.ProductType.NameProductType
              : null,
          Sex: {
            id:
              product.ProductType && product.ProductType.Sex
                ? product.ProductType.Sex[0]._id
                : null,
            NameSex:
              product.ProductType && product.ProductType.Sex
                ? product.ProductType.Sex[0].NameSex
                : null,
          },
        },
      }));
      res.status(200).json(productBySex);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  //Get All Product By NameSex + Product Type
  getAllProductBySexAndPType: async (req, res) => {
    try {
      const nameSex = req.body.NameSex;
      const nameProductType = req.body.NameProductType;
      const sex = await Sex.findOne({ NameSex: nameSex });
      const productType = await ProductType.find({
        NameProductType: nameProductType,
        Sex: sex._id,
      }).populate({
        path: "Sex",
      });
      if (!productType) {
        return res.status(200).json({ message: "Product type not found" });
      }
      const products = await Product.find({
        ProductType: productType,
      }).populate({ path: "ProductType", populate: { path: "Sex" } });
      const productByST = products.map((product) => ({
        id: product._id,
        NameProduct: product.NameProduct,
        PriceProduct: product.PriceProduct,
        ImageProduct: product.ImageProduct,
        Description: product.Description,
        StatusProduct: product.StatusProduct,
        CreateDate: moment(product.CreateDate)
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY-MM-DD HH:mm:ss"),
        UpdateDate: moment(product.UpdateDate)
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY-MM-DD HH:mm:ss"),
        ProductType: {
          id: product.ProductType !== null ? product.ProductType._id : null,
          NameProductType:
            product.ProductType !== null
              ? product.ProductType.NameProductType
              : null,
          Sex: {
            id:
              product.ProductType && product.ProductType.Sex
                ? product.ProductType.Sex[0]._id
                : null,
            NameSex:
              product.ProductType && product.ProductType.Sex
                ? product.ProductType.Sex[0].NameSex
                : null,
          },
        },
      }));
      res.status(200).json(productByST);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  //Get All Product by ID_Sex and ID_ProductType
  getAllProductByIDSexAndIDType: async (req, res) => {
    try {
      const IDSex = req.params.IDSex;
      const IDProductType = req.params.IDProductType;
      const sex = await Sex.findOne({ _id: IDSex });
      const productType = await ProductType.find({
        _id: IDProductType,
        Sex: sex._id,
      }).populate({
        path: "Sex",
      });
      if (!productType) {
        return res.status(200).json({ message: "Product type not found" });
      }
      const products = await Product.find({
        ProductType: productType,
      }).populate({ path: "ProductType", populate: { path: "Sex" } });
      const productByST = products.map((product) => ({
        id: product._id,
        NameProduct: product.NameProduct,
        PriceProduct: product.PriceProduct,
        ImageProduct: product.ImageProduct,
        Description: product.Description,
        StatusProduct: product.StatusProduct,
        CreateDate: moment(product.CreateDate)
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY-MM-DD HH:mm:ss"),
        UpdateDate: moment(product.UpdateDate)
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY-MM-DD HH:mm:ss"),
        ProductType: {
          id: product.ProductType !== null ? product.ProductType._id : null,
          NameProductType:
            product.ProductType !== null
              ? product.ProductType.NameProductType
              : null,
          Sex: {
            id:
              product.ProductType && product.ProductType.Sex
                ? product.ProductType.Sex[0]._id
                : null,
            NameSex:
              product.ProductType && product.ProductType.Sex
                ? product.ProductType.Sex[0].NameSex
                : null,
          },
        },
      }));
      res.status(200).json(productByST);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  //get product latest flow quality
  getProductsByquality: async (req, res) => {
    try {
      const quality = parseInt(req.params.quality); // lấy giá trị limit từ req.params
      const products = await Product.find({ StatusProduct: 1 }) //tìm sản phẩm đang còn hàng
        .sort({ CreateDate: -1 }) //hàm sort sắp xếp theo thứ tự giảm dần của ngày nhập vào
        .limit(quality);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getProductsByName: async (req, res) => {
    try {
      const name = parseInt(req.params.name); // lấy giá trị limit từ req.params
      const products = await Product.find({ name }); //tìm sản phẩm đang còn hàng
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  //Add Product Details
  addProductDetails: async (req, res) => {
    try {
      const newProductDetail = new ProductDetail(req.body);
      const saveProductDetail = await newProductDetail.save();
      res.status(200).json(saveProductDetail);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = productController;
