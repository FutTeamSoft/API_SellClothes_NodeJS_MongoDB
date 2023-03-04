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
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  const accountController = {
    addCustomer: async (req, res) => {
      try {
        const { FullName, Email, PhoneNumber, AddressUser, PasswordUser } = req.body;
        // kiểm tra email đã tồn tại
        const checkEmail = await Account.findOne({ Email });
        if (checkEmail) {
          return res.status(400).json({ message: 'Email đã tồn tại!' });
        }
        
        // hàm mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(PasswordUser, salt);
  
        // theemm account mới
        const newAccount = new Account({
          FullName,
          Email,
          PhoneNumber,
          AddressUser,
          PasswordUser: hashedPassword,
          StatusAccount: 1,
        });
        //lưu account vừa thêm
        const savedAccount = await newAccount.save();
        res.status(200).json(savedAccount);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  };
  
  module.exports = accountController;