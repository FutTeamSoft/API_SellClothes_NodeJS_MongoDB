const request = require("supertest");
const app = require("../../index");
const { Account } = require("../models/model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
describe("loginCustomer function", () => {
  //let token = "";

  const mockAccount = {
    Email: "test1111@gmail.com",
    PasswordUser: "12333",
    FullName: "test1",
    PhoneNumber: "12345678901",
    AddressUser: "quận 101",
  };
  const PasswordUser1 = mockAccount.PasswordUser;
  beforeAll(async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mockAccount.PasswordUser, salt);
    mockAccount.PasswordUser = hashedPassword;
    await Account.create(mockAccount);
  });

  afterAll(async () => {
    await Account.deleteOne({ Email: mockAccount.Email });
  });

  it("should return an error if email does not exist", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({ Email: "wrong@test.com", PasswordUser: mockAccount.PasswordUser })
      .expect(200);
    expect(response.body.message).toBe("Email không tồn tại");
  });

  it("should return an error if password is incorrect", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({ Email: mockAccount.Email, PasswordUser: "wrongpassword" })
      .expect(200);
    expect(response.body.message).toBe("Mật khẩu không đúng");
  });

  it("should return a token and user data if login is successful", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({
        Email: mockAccount.Email,
        PasswordUser: PasswordUser1,
      })
      .expect(200);
    expect(response.body.message).toBe("Đăng nhập thành công!");
    expect(response.body.account).toHaveProperty("token");
    expect(response.body.account).toHaveProperty("id");
    expect(response.body.account).toHaveProperty("FullName");
    expect(response.body.account).toHaveProperty("Email");
    expect(response.body.account).toHaveProperty("PhoneNumber");
    expect(response.body.account).toHaveProperty("AddressUser");
    expect(response.body.account).toHaveProperty("PasswordUser");
  });
});
