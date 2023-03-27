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
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const useController = {
  addFeedback: async (req, res) => {
    try {
      const newFeedback = new FeedBack(req.body);
      const savedFeedback = await newFeedback.save();
      res.status(200).json({
        message: "Thêm thành công!",
      });
    } catch (err) {
      res.status(200).json(err);
    }
  },

  getFeedback: async (req, res) => {
    try {
      const allFeedback = await FeedBack.find().lean();
      const feedback = allFeedback.map((feedback) => ({
        id: feedback._id,
        FullNameUserFeedBack: feedback.FullNameUserFeedBack,
        EmailUserFeedBack: feedback.EmailUserFeedBack,
        DescribeFeedBack: feedback.PhoneNumber,
      }));
      res.status(200).json(feedback);
    } catch (err) {
      res.status(200).json(err);
    }
  },
  addCustomer: async (req, res) => {
    try {
      const { FullName, Email, PhoneNumber, AddressUser, PasswordUser } =
        req.body;
      // kiểm tra email đã tồn tại
      const checkEmail = await Account.findOne({ Email });
      if (checkEmail) {
        return res.status(200).json({ message: "Email đã tồn tại!" });
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
      res.status(200).json({
        message: "Đăng kí thành công!",
        account: {
          id: savedAccount._id,
          FullName: savedAccount.FullName,
          Email: savedAccount.Email,
          PhoneNumber: savedAccount.PhoneNumber,
          AddressUser: savedAccount.AddressUser,
          PasswordUser: savedAccount.PasswordUser,
          StatusAccount: savedAccount.StatusAccount,
        },
      });
    } catch (err) {
      res.status(200).json(err);
    }
  },

  loginCustomer: async (req, res) => {
    try {
      const { Email, PasswordUser } = req.body;

      //kiểm tra e mail có tồn tại không
      const checkdata = await Account.findOne({ Email });
      if (!checkdata) {
        return res.status(200).json({ message: "Email không tồn tại" });
      }

      // kiểm tra mật khẩu
      const checkpass = await bcrypt.compare(
        PasswordUser,
        checkdata.PasswordUser
      );
      if (!checkpass) {
        return res.status(200).json({ message: "Mật khẩu không đúng" });
      }
      // tạo và đăng kí token bằng thư viện jwt
      const payload = {
        Account: {
          _id: checkdata._id,
        },
      };
      //với lệnh jwt.sign để tạo token chứa đối tượng id của khách hàng
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            message: "Đăng nhập thành công!",
            account: {
              id: checkdata._id,
              FullName: checkdata.FullName,
              Email: checkdata.Email,
              PhoneNumber: checkdata.PhoneNumber,
              AddressUser: checkdata.AddressUser,
              PasswordUser: checkdata.PasswordUser,
              token,
            },
          });
        }
      );
    } catch (err) {
      res.status(200).json(err);
    }
  },

  updateCustomer: async (req, res) => {
    try {
      const { id } = req.params;
      const { FullName, Email, PhoneNumber, AddressUser, PasswordUserOld, PassNew } =
        req.body;
  
      // kiểm tra khách hàng tồn tại hay k
      const customer = await Account.findById(id);
      if (!customer) {
        return res.status(200).json({ message: "Không tìm thấy khách hàng" });
      }
  
      // kiểm tra mật khẩu hiện tại có đúng không
      if (PasswordUserOld && PassNew) {
        const isMatch = await bcrypt.compare(PasswordUserOld, customer.PasswordUser);
        if (!isMatch) {
          return res.status(200).json({ message: "Mật khẩu hiện tại không đúng" });
        }
        const cur = await bcrypt.compare(PassNew, customer.PasswordUser);
        if (cur) {
          return res.status(200).json({ message: "Mật khẩu không đươc trung với mật khẩu hiện tại!" });
        }
      }else if(PasswordUserOld && !PassNew){
        return res.status(200).json({ message: "Mời nhập mât khẩu mới!" });
      }else if(!PasswordUserOld && PassNew){
        return res.status(200).json({ message: "Mời nhập mât khẩu củ!" });
      }
  
      // cập nhật khách hàng
      customer.FullName = FullName;
      customer.Email = Email;
      customer.PhoneNumber = PhoneNumber;
      customer.AddressUser = AddressUser;
  
      // nếu không có mật khẩu mới, giữ nguyên mật khẩu cũ
      if (!PassNew && !PasswordUserOld) {
        customer.PasswordUser = customer.PasswordUser;
      } else if(PassNew && PasswordUserOld) {
        // mã hóa mật khẩu mới
        const salt = await bcrypt.genSalt(10);
        customer.PasswordUser = await bcrypt.hash(PassNew, salt);
      }
  
      // lưu custommer vào data
      await customer.save();
      res.status(200).json({
        message: "Cập nhật thành công",
        account: {
          id: customer._id,
          FullName: customer.FullName,
          Email: customer.Email,
          PhoneNumber: customer.PhoneNumber,
          AddressUser: customer.AddressUser,
          PasswordUser: customer.PasswordUser,
          StatusAccount: customer.StatusAccount,
        },
      });
    } catch (err) {
      res.status(200).json(err);
    }
  },
  
  getAllAccount: async (req, res) => {
    try {
      const allAccount = await Account.find().lean();
      const accounts = allAccount.map((account) => ({
        id: account._id,
        FullName: account.FullName,
        Email: account.Email,
        PhoneNumber: account.PhoneNumber,
        AddressUser: account.AddressUser,
        PasswordUser: account.PasswordUser,
        StatusAccount: account.StatusAccount,
      }));
      res.status(200).json(accounts);
    } catch (err) {
      res.status(200).json(err);
    }
  },
  addAdmin: async (req, res) => {
    try {
      const { UserNameAdmin, PasswordAdmin } = req.body;
      // hàm mã hóa mật khẩu
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(PasswordAdmin, salt);
      const newAdminAccount = new AdminAccount({
        UserNameAdmin,
        PasswordAdmin: hashedPassword,
      });
      const savedAdminAccount = await newAdminAccount.save();
      res.status(200).json(savedAdminAccount);
    } catch (err) {
      res.status(200).json(err);
    }
  },
  loginAdmin: async (req, res) => {
    try {
      const { UserNameAdmin, PasswordAdmin } = req.body;
      const checkdata = await AdminAccount.findOne({ UserNameAdmin });
      // kiểm tra mật khẩu
      const checkpass = await bcrypt.compare(
        PasswordAdmin,
        checkdata.PasswordAdmin
      );
      if (!checkpass) {
        return res.status(200).json({ message: "Mật khẩu không đúng" });
      }
      // tạo và đăng kí token bằng thư viện jwt
      const payload = {
        Account: {
          id: AdminAccount.id,
        },
      };
      //với lệnh jwt.sign để tạo token chứa đối tượng id của khách hàng
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res.json({
            message: "Đăng nhập thành công!",
            account: {
              id: checkdata._id,
              UserNameAdmin: checkdata.UserNameAdmin,
              PasswordAdmin: checkdata.PasswordAdmin,
              token,
            },
          });
        }
      );
    } catch (err) {
      res.status(200).json(err);
    }
  },
  updatePasswordWithEmail:async(req, res) => {
    const email = req.params.email;
  
    // Generate new random password
    const randomPassword = Math.floor(10000 + Math.random() * 90000);
  
    try {
      // Find account by email
      const account = await Account.findOne({ Email: email });
      if (!account) {
        return res.status(200).json({ message: 'Không tìm thấy tài khoản.' });
      }
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(randomPassword.toString(), salt);
      
      // Update password in database
      account.PasswordUser = hash;
      await account.save();
  
      // Send email with new password
      const transporter = nodemailer.createTransport({
        service: 'vantuan181002@gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'tuansk1002@gmail.com',
          pass: '0373272294tuan',
        },
      });
  
      const mailOptions = {
        from: 'tuansk1002@gmail.com',
        to: email,
        subject: 'Mật khẩu mới của tài khoản của bạn',
        text: `Mật khẩu mới của tài khoản của bạn là ${randomPassword}.`,
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  
      // Send response
      return res.json({ message: 'Mật khẩu đã được cập nhật và gửi đến email của bạn.' });
    } catch (error) {
      console.error(error);
      return res.status(200).json({ message: 'Đã có lỗi xảy ra.' });
    }
  },
};

module.exports = useController;
