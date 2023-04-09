const request = require("supertest");
const app = require("../../index");
const { Account } = require("../models/model");
const bcrypt = require("bcrypt");

describe("addCustomer function", () => {
  let mockAccount = null;
  let token = "";

  beforeAll(async () => {
    mockAccount = {
      FullName: "Lê Đình Các",
      Email: "ledinhcac1@gmail.com",
      PhoneNumber: "0987654321",
      AddressUser: "123 Test Street",
      PasswordUser: "123",
    };

    // Generate hashed password
    const salt = await bcrypt.genSalt(10);
    mockAccount.PasswordUser = await bcrypt.hash(
      mockAccount.PasswordUser,
      salt
    );
  });

  afterAll(async () => {
    await Account.deleteOne({ Email: mockAccount.Email });
  });

  it("should return an error if Email already exists", async () => {
    // Insert mock data
    await Account.create(mockAccount);

    // Make a request with the same email
    const response = await request(app)
      .post("/users/addCustomer")
      .send(mockAccount);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Email đã tồn tại!" });
  });

  it("should return success and correct user data if input is valid", async () => {
    await Account.deleteOne({ Email: mockAccount.Email });
    const response = await request(app)
      .post("/users/addCustomer")
      .send(mockAccount);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Đăng kí thành công!");
    expect(response.body.account).toHaveProperty("id");
    expect(response.body.account.FullName).toBe(mockAccount.FullName);
    expect(response.body.account.Email).toBe(mockAccount.Email);
    expect(response.body.account.PhoneNumber).toBe(mockAccount.PhoneNumber);
    expect(response.body.account.AddressUser).toBe(mockAccount.AddressUser);

    // Check if hashed password is correct
    const isMatched = await bcrypt.compare(
      mockAccount.PasswordUser,
      response.body.account.PasswordUser
    );
    expect(isMatched).toBe(true);
  });

  //   it("should return an error if invalid input is provided", async () => {
  //     const response = await request(app)
  //       .post("/users/addCustomer")
  //       .send({ FullName: "Test User" }); // Missing required field

  //     expect(response.statusCode).toBe(200);
  //     expect(response.body.message).toBe("Email không được để trống");
  //   });
});
