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
const useController = {
  addFeedback: async (req, res) => {
    try {
      const newFeedback = new FeedBack(req.body);
      const savedFeedback = await newFeedback.save();
      res.status(200).json(savedFeedback);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getFeedback: async (req, res) => {
    try {
      const allFeedback = await FeedBack.find();
      res.status(200).json(allFeedback);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addCustomer: async (req, res) => {
    try {
      const { FullName, Email, PhoneNumber, AddressUser, PasswordUser } =
        req.body;
      // kiểm tra email đã tồn tại
      const checkEmail = await Account.findOne({ Email });
      if (checkEmail) {
        return res.status(400).json({ message: "Email đã tồn tại!" });
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

  loginCustomer: async (req, res) => {
    try {
      const { Email, PasswordUser } = req.body;

      //kiểm tra e mail có tồn tại không
      const checkdata = await Account.findOne({ Email });
      if (!checkdata) {
        return res.status(400).json({ message: "Email không tồn tại" });
      }

      // kiểm tra mật khẩu
      const checkpass = await bcrypt.compare(
        PasswordUser,
        checkdata.PasswordUser
      );
      if (!checkpass) {
        return res.status(400).json({ message: "Mật khẩu không đúng" });
      }

      // tạo và đăng kí token bằng thư viện jwt
      const payload = {
        Account: {
          id: Account.id,
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
              _id: checkdata._id,
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
      res.status(500).json(err);
    }
  },

  updateCustomer: async (req, res) => {
    try {
      const { id } = req.params;
      const { FullName, Email, PhoneNumber, AddressUser, PasswordUser } =
        req.body;

      // kiểm tra khách hàng tồn tại hay k
      const customer = await Account.findById(id);
      if (!customer) {
        return res.status(404).json({ message: "Không tìm thấy khách hàng" });
      }

      // cập nhật khách hàng
      customer.FullName = FullName;
      customer.Email = Email;
      customer.PhoneNumber = PhoneNumber;
      customer.AddressUser = AddressUser;

      // mã hóa mật khẩu mới
      if (PasswordUser) {
        const salt = await bcrypt.genSalt(10);
        customer.PasswordUser = await bcrypt.hash(PasswordUser, salt);
      }

      // lưu mật khẩu vào data
      await customer.save();

      res.json(customer);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAllAccount: async (req, res) => {
    try {
      const allAccount = await Account.find();
      res.status(200).json(allAccount);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addAdmin: async (req, res) => {
    try {
      const { UserNameAdmin, PasswordAdmin} =
        req.body;
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
      res.status(500).json(err);
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
        return res.status(400).json({ message: "Mật khẩu không đúng" });
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
      res.status(500).json(err);
    }}
};

module.exports = useController;
