const mongoose = require("mongoose");

//Sex
const SexSchema = new mongoose.Schema({
  NameSex: {
    type: String,
    required: true,
  },
});

//Product Type
const ProductTypeSchema = new mongoose.Schema({
  NameProductType: {
    type: String,
    required: true,
  },
  Sex: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sex",
      required: true,
    },
  ],
});
//SizeProduct
const SizeProductSchema = new mongoose.Schema({
  TenSize: {
    type: String,
    required: true,
    trim: true,
  },
});
//Image
const ImageProductSchema = new mongoose.Schema({
  TenHinh: {
    type: String,
    required: true,
  },
  DuongDanHinh: {
    type: String,
    required: true,
    trim: true,
  },
});
//Product
const ProductSchema = new mongoose.Schema({
  NameProduct: {
    type: String,
    required: true,
    trim: true,
  },
  PriceProduct: {
    type: Number,
    required: true,
    min: 0,
  },
  ImageProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ImageProduct",
    required: true,
  },
  CreateDate: {
    type: Date,
    default: Date.now,
  },
  UpdateDate: {
    type: Date,
    default: Date.now,
  },
  Description: {
    type: String,
    trim: true,
  },
  StatusProduct: {
    type: Number,
    required: true,
    enump: [0, 1],
    default: 1,
  },
  ProductType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductType",
    required: true,
  },
});

//Produt Detail
const ProductDetailSchema = new mongoose.Schema({
  Product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  SizeProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SizeProduct",
  },
  SoLuongTon: {
    type: Number,
    required: true,
    min: 0,
  },
});

//Admin Account
const AdminAccountSchema = new mongoose.Schema({
  UserNameAdmin: {
    type: String,
    required: true,
  },
  PasswordAdmin: {
    type: String,
    required: true,
  },
});

//FeedBack
const FeedBackSchema = new mongoose.Schema({
  FullNameUserFeedBack: {
    type: String,
    required: true,
  },
  EmailUserFeedBack: {
    type: String,
    required: true,
  },
  DescribeFeedBack: {
    type: String,
    required: true,
  },
});

//Account
const AccountSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
  },
  AddressUser: {
    type: String,
    required: true,
  },
  PasswordUser: {
    type: String,
    required: true,
  },
  StatusAccount: {
    type: Number,
    required: true,
    enump: [0, 1],
    default: 1,
  },
});

//Invoice
const InvoiceSchema = new mongoose.Schema({
  InvoiceNameReceiver: {
    type: String,
    required: true,
  },
  InvoiceAddressReceiver: {
    type: String,
    required: true,
  },
  InvoicePhoneReceiver: {
    type: Number,
    required: true,
  },
  InvoiceDate: {
    type: Date,
    required: true,
  },
  TotalInvoice: {
    type: Number,
    required: true,
    default: 0,
  },
  PaymentsInvoice: {
    type: String,
    required: true,
  },
  StatusInvoice: {
    type: Number,
    required: true,
    enump: [0, 1],
    default: 1,
  },
  Paid: {
    type: Number,
    required: true,
    enump: [0, 1],
    default: 1,
  },
  NoteInvoice: {
    type: String,
  },
  AccountID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
});

//Invoice Detail
const InvoiceDetailsSchema = new mongoose.Schema({
  SizeProductID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductDetail",
    required: true,
  },
  ProductID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductDetail",
    required: true,
  },
  InvoiceID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invoice",
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  UnitPrice: {
    type: Number,
    required: true,
    default: 0,
  },
});
const CartSchema = new mongoose.Schema({
  Product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  Account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  CartProductSize: {
    type: String,
    required: true,
  },
  CartProductQuantity: {
    type: Number,
    required: true,
  },
});
//Tạo model
let Sex = mongoose.model("Sex", SexSchema);
let ProductType = mongoose.model("ProductType", ProductTypeSchema);
let ImageProduct = mongoose.model("ImageProduct", ImageProductSchema);
let Product = mongoose.model("Product", ProductSchema);
let ProductDetail = mongoose.model("ProductDetail", ProductDetailSchema);
let SizeProduct = mongoose.model("SizeProduct", SizeProductSchema);
let AdminAccount = mongoose.model("AdminAccount", AdminAccountSchema);
let FeedBack = mongoose.model("FeedBack", FeedBackSchema);
let Account = mongoose.model("Account", AccountSchema);
let Invoice = mongoose.model("Invoice", InvoiceSchema);
let InvoiceDetails = mongoose.model("InvoiceDetails", InvoiceDetailsSchema);
let Cart = mongoose.model("Cart", CartSchema);
//Export các model
module.exports = {
  Sex,
  ProductType,
  ImageProduct,
  Product,
  ProductDetail,
  SizeProduct,
  AdminAccount,
  FeedBack,
  Account,
  Invoice,
  InvoiceDetails,
  Cart,
};
