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
  Cart,
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
  //Xóa Size theo ID
  deleteSize: async (req, res) => {
    try {
      const idProductSize = req.params.idProductSize;
      const productSize = await SizeProduct.findById(idProductSize);
      if (!productSize) {
        return res.status(404).json({ message: "Size not found" });
      }

      await SizeProduct.findByIdAndDelete(idProductSize);
      res.status(200).json({ message: "Deleted Size Successfully!" });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  //Get All Product
  getAllProduct: async (req, res) => {
    try {
      const allProducts = await Product.find()
        .populate({
          path: "ProductType",
          populate: { path: "Sex" },
        })
        .populate({ path: "ImageProduct" });
      const allProduct = allProducts.map((product) => ({
        id: product._id,
        NameProduct: product.NameProduct,
        PriceProduct: product.PriceProduct,
        ImageProduct: {
          id: product.ImageProduct ? product.ImageProduct._id : null,
          TenHinh: product.ImageProduct ? product.ImageProduct.TenHinh : null,
          DuongDanHinh: product.ImageProduct
            ? product.ImageProduct.DuongDanHinh
            : null,
        },
        Description: product.Description,
        StatusProduct: product.StatusProduct,
        CreateDate: moment(product.CreateDate)
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY-MM-DD HH:mm:ss"),
        UpdateDate: moment(product.UpdateDate)
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY-MM-DD HH:mm:ss"),
        ProductType: {
          id: product.ProductType ? product.ProductType._id : null,
          NameProductType: product.ProductType
            ? product.ProductType.NameProductType
            : null,
          Sex:
            product.ProductType &&
            product.ProductType.Sex &&
            product.ProductType.Sex[0]
              ? {
                  id: product.ProductType.Sex[0]._id,
                  NameSex: product.ProductType.Sex[0].NameSex,
                }
              : null,
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
          populate: [
            { path: "ProductType", populate: { path: "Sex" } },
            { path: "ImageProduct" },
          ],
        })
        .populate({ path: "SizeProduct" });
      if (!allProductDetails.length) {
        res.status(200).json({ message: "Không tìm thấy sản phẩm" });
        return;
      }
      const allproductdl = allProductDetails.map((allproduct) => ({
        id: allproduct._id,
        Product: {
          id: allproduct.Product._id,
          NameProduct: allproduct.Product.NameProduct,
          PriceProduct: allproduct.Product.PriceProduct,
          ImageProduct: {
            id: allproduct.Product.ImageProduct._id,
            TenHinh: allproduct.Product.ImageProduct.TenHinh,
            DuongDanHinh: allproduct.Product.ImageProduct.DuongDanHinh,
          },
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
          id: allproduct.SizeProduct ? allproduct.SizeProduct._id : null,
          TenSize: allproduct.SizeProduct
            ? allproduct.SizeProduct.TenSize
            : null,
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
  //Delete Product Type
  deleteProductType: async (req, res) => {
    try {
      const idProductType = req.params.idProductType;

      const productType = await ProductType.findById(idProductType);
      if (!productType) {
        return res.status(404).json({ message: "Product Type not found" });
      }

      await ProductType.findByIdAndDelete(idProductType);
      res.status(200).json({ message: "Deleted Product Type Successfully!" });
    } catch (err) {
      res.status(500).json(err.message);
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
      })
        .populate({
          path: "ProductType",
          populate: {
            path: "Sex",
          },
        })
        .populate({ path: "ImageProduct" });
      const productBySex = products.map((product) => ({
        id: product._id,
        NameProduct: product.NameProduct,
        PriceProduct: product.PriceProduct,
        ImageProduct: {
          id: product.ImageProduct._id,
          TenHinh: product.ImageProduct.TenHinh,
          DuongDanHinh: product.ImageProduct.DuongDanHinh,
        },
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
      const sex = await Sex.findOne({ _id: ID_Sex });
      const productTypes = await ProductType.find({ Sex: sex._id }).lean();
      const products = await Product.find({
        ProductType: { $in: productTypes },
      })
        .populate({
          path: "ProductType",
          populate: {
            path: "Sex",
          },
        })
        .populate({ path: "ImageProduct" });
      const productBySex = products.map((product) => ({
        id: product._id,
        NameProduct: product.NameProduct,
        PriceProduct: product.PriceProduct,
        ImageProduct: {
          id: product.ImageProduct._id,
          TenHinh: product.ImageProduct.TenHinh,
          DuongDanHinh: product.ImageProduct.DuongDanHinh,
        },
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
  //Get All Product By NameSex + Product Type
  getAllProductBySexAndPType: async (req, res) => {
    try {
      const nameProductType = req.body.NameProductType;
      const nameSex = req.body.NameSex;
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
      })
        .populate({
          path: "ProductType",
          populate: {
            path: "Sex",
          },
        })
        .populate({ path: "ImageProduct" });
      const productByST = products.map((product) => ({
        id: product._id,
        NameProduct: product.NameProduct,
        PriceProduct: product.PriceProduct,
        ImageProduct: {
          id: product.ImageProduct._id,
          TenHinh: product.ImageProduct.TenHinh,
          DuongDanHinh: product.ImageProduct.DuongDanHinh,
        },
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
      })
        .populate({
          path: "ProductType",
          populate: {
            path: "Sex",
          },
        })
        .populate({ path: "ImageProduct" });
      const productByST = products.map((product) => ({
        id: product._id,
        NameProduct: product.NameProduct,
        PriceProduct: product.PriceProduct,
        ImageProduct: {
          id: product.ImageProduct._id,
          TenHinh: product.ImageProduct.TenHinh,
          DuongDanHinh: product.ImageProduct.DuongDanHinh,
        },
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
        .limit(quality)
        .populate({
          path: "ProductType",
          populate: {
            path: "Sex",
          },
        })
        .populate({ path: "ImageProduct" });
      const productQTT = products.map((product) => ({
        id: product._id,
        NameProduct: product.NameProduct,
        PriceProduct: product.PriceProduct,
        ImageProduct: {
          id: product.ImageProduct._id,
          TenHinh: product.ImageProduct.TenHinh,
          DuongDanHinh: product.ImageProduct.DuongDanHinh,
        },
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
      res.status(200).json(productQTT);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getProductsByName: async (req, res) => {
    try {
      const name = parseInt(req.params.name); // lấy giá trị limit từ req.params
      const products = await Product.find({ name })
        .populate({
          path: "ProductType",
          populate: {
            path: "Sex",
          },
        })
        .populate({ path: "ImageProduct" });
      const productSearch = products.map((product) => ({
        id: product._id,
        NameProduct: product.NameProduct,
        PriceProduct: product.PriceProduct,
        ImageProduct: {
          id: product.ImageProduct._id,
          TenHinh: product.ImageProduct.TenHinh,
          DuongDanHinh: product.ImageProduct.DuongDanHinh,
        },
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
      res.status(200).json(productSearch);
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
  //Add Product into Cart
  addProductIntoCart: async (req, res) => {
    try {
      const { Product, Account, CartProductSize, CartProductQuantity } =
        req.body;

      // Tìm kiếm sản phẩm và size trong giỏ hàng
      const cart = await Cart.findOne({ Product, CartProductSize });

      if (!cart) {
        // Nếu sản phẩm và size chưa có trong giỏ hàng, thêm sản phẩm mới
        const newCart = new Cart({
          Product,
          Account,
          CartProductQuantity,
          CartProductSize,
        });
        await newCart.save();
        res.status(200).json({ message: "Thêm vào giỏ hành thành công!" });
      } else {
        // Nếu sản phẩm và size đã có trong giỏ hàng, tăng số lượng sản phẩm
        cart.CartProductQuantity += CartProductQuantity;
        await cart.save();
        res
          .status(200)
          .json({ message: "Cập nhật số lượng sản phẩm thành công!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Get Cart By ID Account
  getCartByIDAccount: async (req, res) => {
    try {
      const idAccount = req.params.idAccount;
      const cartt = await Cart.find({ Account: idAccount })
        .populate({
          path: "Product",
          populate: [
            { path: "ProductType", populate: { path: "Sex" } },
            { path: "ImageProduct" },
          ],
        })
        .populate({ path: "Account" });
      const carts = cartt.map((cart) => ({
        id: cart._id,
        Product: {
          id: cart.Product._id,
          NameProduct: cart.Product.NameProduct,
          PriceProduct: cart.Product.PriceProduct,
          ImageProduct: {
            id: cart.Product.ImageProduct._id,
            TenHinh: cart.Product.ImageProduct.TenHinh,
            DuongDanHinh: cart.Product.ImageProduct.DuongDanHinh,
          },
          Description: cart.Product.Description,
          StatusProduct: cart.Product.StatusProduct,
          CreateDate: moment(cart.Product.CreateDate)
            .tz("Asia/Ho_Chi_Minh")
            .format("YYYY-MM-DD HH:mm:ss"),
          UpdateDate: moment(cart.Product.UpdateDate)
            .tz("Asia/Ho_Chi_Minh")
            .format("YYYY-MM-DD HH:mm:ss"),
          ProductType: {
            id: cart.Product.ProductType._id,
            NameProductType: cart.Product.ProductType.NameProductType,
            Sex: {
              id:
                cart.Product.ProductType.Sex.length > 0
                  ? cart.Product.ProductType.Sex[0]._id
                  : null,
              NameSex:
                cart.Product.ProductType.Sex.length > 0
                  ? cart.Product.ProductType.Sex[0].NameSex
                  : null,
            },
          },
        },
        CartProductSize: cart.CartProductSize,
        CartProductQuantity: cart.CartProductQuantity,
      }));
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  //GetProductDetailByIDProduct
  getProductDetailByIDProduct: async (req, res) => {
    try {
      const idProduct = req.params.idProduct;
      const allProductDetails = await ProductDetail.find({
        Product: idProduct,
      }).populate({
        path: "Product",
        populate: [
          { path: "ProductType", populate: { path: "Sex" } },
          { path: "ImageProduct" },
        ],
      });

      if (allProductDetails.length === 0) {
        res.status(200).json({ message: "Không tìm thấy sản phẩm" });
        return;
      }
      // Kiểm tra xem có tồn tại SizeProduct hay không
      if (!allProductDetails[0].SizeProduct) {
        res.status(200).json({ message: "Không tìm thấy SizeProduct" });
        return;
      }
      // Nếu SizeProduct tồn tại thì tiếp tục thực hiện populate
      const allProductDetailsWithSize = await ProductDetail.populate(
        allProductDetails,
        {
          path: "SizeProduct",
        }
      );

      const allproductdl = allProductDetailsWithSize.map((allproduct) => ({
        id: allproduct._id,
        Product: {
          id: allproduct.Product._id,
          NameProduct: allproduct.Product.NameProduct,
          PriceProduct: allproduct.Product.PriceProduct,
          ImageProduct: {
            id: allproduct.Product.ImageProduct._id,
            TenHinh: allproduct.Product.ImageProduct.TenHinh,
            DuongDanHinh: allproduct.Product.ImageProduct.DuongDanHinh,
          },
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
          id: allproduct.SizeProduct ? allproduct.SizeProduct._id : null,
          TenSize: allproduct.SizeProduct
            ? allproduct.SizeProduct.TenSize
            : null,
        },

        SoLuongTon: allproduct.SoLuongTon,
      }));

      res.status(200).json(allproductdl);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  //Update Quantity in Cart
  updateCart: async (req, res) => {
    try {
      const { idCart, Product, CartProductSize, CartProductQuantity } =
        req.body;

      // Tìm kiếm giỏ hàng dựa trên idCart và kiểm tra sản phẩm có tồn tại và trùng Size
      const cart = await Cart.findOne({
        _id: idCart,
        Product,
        CartProductSize,
      });
      if (!cart) {
        return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
      }

      // Cập nhật số lượng sản phẩm trong giỏ hàng
      cart.CartProductQuantity = CartProductQuantity;
      await cart.save();

      res.status(200).json({ message: "Cập nhật giỏ hàng thành công" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  //Delete Product In Cart
  deleteProductInCart: async (req, res) => {
    try {
      const idProduct = req.params.idProduct;
      const idAccount = req.params.idAccount;
      // Tìm kiếm bản ghi Cart dựa trên IdAccount
      const cart = await Cart.findOne({ Account: idAccount });
      if (!cart) {
        return res.status(404).json({ message: "Không tìm thấy Cart" });
      }
      const carts = await Cart.findOne({ Product: idProduct });
      await carts.remove();
      res.status(200).json({ msg: "Product removed from cart" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  //Delete All Product In Cart
  deleteAllProductAllCart: async (req, res) => {
    try {
      const idAccount = req.params.idAccount;
      const result = await Cart.deleteMany({ Account: idAccount });

      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ message: "Không có sản phẩm trong giỏ hàng" });
      }

      res.status(200).json({ message: "All products deleted from cart" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json(err);
    }
  },
  //Get Product By ID Product
  getProductByIDProduct: async (req, res) => {
    try {
      const idProduct = req.params.idProduct;
      const products = await Product.find({ _id: idProduct })
        .populate({
          path: "ProductType",
          populate: { path: "Sex" },
        })
        .populate({ path: "ImageProduct" });
      const productById = products.map((product) => ({
        id: product._id,
        NameProduct: product.NameProduct,
        PriceProduct: product.PriceProduct,
        ImageProduct: {
          id: product.ImageProduct._id,
          TenHinh: product.ImageProduct.TenHinh,
          DuongDanHinh: product.ImageProduct.DuongDanHinh,
        },
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

      res.status(200).json(productById);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  //Get all size by product ID
  getSizeByProduct: async (req, res) => {
    try {
      const idProduct = req.params.idProduct;
      const productDetail = await ProductDetail.find({
        Product: idProduct,
      }).populate({ path: "SizeProduct" });
      const sizep = productDetail.map((product) => ({
        SizeProduct: product.SizeProduct.TenSize,
        SoLuongTon: product.SoLuongTon,
      }));
      res.status(200).json(sizep);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
};
module.exports = productController;
