const request = require("supertest");
const app = require("../../index");
const { Account } = require("../models/model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

describe("changePassword function", () => {
  let customer = null;
  let token = "";

  beforeAll(async () => {
    const mockCustomer = {
      FullName: "Lê Đình Các",
      Email: "ledinhcac@gmail.com",
      PhoneNumber: "0987654321",
      AddressUser: "123 Test Street",
      PasswordUser: "123",
    };
    const salt = await bcrypt.genSalt(10);
    mockCustomer.PasswordUser = await bcrypt.hash(
      mockCustomer.PasswordUser,
      salt
    );

    customer = await Account.create(mockCustomer);
  });

  afterAll(async () => {
    await Account.deleteOne({ Email: customer.Email });
  });

  it("should return an error if current password is incorrect", async () => {
    const loginResponse1 = await request(app)
      .post("/users/login")
      .send({
        Email: "ledinhcac@gmail.com",
        PasswordUser: "123",
      })
      .expect(200);
    token = loginResponse1.body.account.token;
    const response = await request(app)
      .put(`/users/changePassword/${customer._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        PasswordUserOld: "123323",
        PassNew: "1234",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Mật khẩu hiện tại không đúng" });
  });

  it("should return an error if new password is the same as current password", async () => {
    const loginResponse2 = await request(app)
      .post("/users/login")
      .send({
        Email: "ledinhcac@gmail.com",
        PasswordUser: "123",
      })
      .expect(200);
    token = loginResponse2.body.account.token;

    const response = await request(app)
      .put(`/users/changePassword/${customer._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        PasswordUserOld: "123",
        PassNew: "123",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Mật khẩu không đươc trung với mật khẩu hiện tại!",
    });
  });

  it("should return an error if no new password is provided", async () => {
    const loginResponse2 = await request(app)
      .post("/users/login")
      .send({
        Email: "ledinhcac@gmail.com",
        PasswordUser: "123",
      })
      .expect(200);
    token = loginResponse2.body.account.token;

    const response = await request(app)
      .put(`/users/changePassword/${customer._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        PasswordUserOld: "123",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Mời nhập mât khẩu mới!" });
  });

  it("should return an error if no current password is provided", async () => {
    const loginResponse2 = await request(app)
      .post("/users/login")
      .send({
        Email: "ledinhcac@gmail.com",
        PasswordUser: "123",
      })
      .expect(200);
    token = loginResponse2.body.account.token;

    const response = await request(app)
      .put(`/users/changePassword/${customer._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        PassNew: "123",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Mời nhập mât khẩu củ!" });
  });
  it("should update customer's password if all input is valid", async () => {
    const loginResponse2 = await request(app)
      .post("/users/login")
      .send({
        Email: "ledinhcac@gmail.com",
        PasswordUser: "123",
      })
      .expect(200);
    token = loginResponse2.body.account.token;

    const response = await request(app)
      .put(`/users/changePassword/${customer._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        PasswordUserOld: "123",
        PassNew: "1234",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Cập nhật thành công" });

    // Check if password has been updated successfully
    const updatedCustomer = await Account.findById(customer._id);
    const match = await bcrypt.compare("1234", updatedCustomer.PasswordUser);
    expect(match).toBe(true);
  });

  it("should return an error if token is not provided", async () => {
    const response = await request(app)
      .put("/users/changePassword/${customer._id}")
      .send({
        PasswordUserOld: "123",
        PassNew: "1234",
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Token không hợp lệ" });
  });

  it("should return an error if invalid token is provided", async () => {
    const response = await request(app)
      .put("/users/changePassword/${customer._id}")
      .set("Authorization", "Bearer invalid_token")
      .send({
        PasswordUserOld: "123",
        PassNew: "1234",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Token không hợp lệ" });
  });
});
