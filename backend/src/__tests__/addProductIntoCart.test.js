const request = require("supertest");
const app = require("../../index");
const { Cart } = require("../models/model");

describe("POST /cart", () => {
  afterEach(async () => {
    let account = "6431a079eb45b377ec0d9308";
    let product = "642155b4d4e01b8867909b21";
    let size = "XL";
    // Reset the database after each test
    await Cart.deleteMany({
      Product: product,
      Account: account,
      CartProductSize: size,
    });
  });

  beforeAll(async () => {
    let account = "6431a079eb45b377ec0d9308";
    let product = "642155b4d4e01b8867909b21";
    let size = "XL";
    // Reset the database after each test
    await Cart.deleteOne({
      Product: product,
      Account: account,
      CartProductSize: size,
    });
  });
  afterAll(async () => {
    let account = "6431a079eb45b377ec0d9308";
    let product = "642155b4d4e01b8867909b21";
    let size = "XL";
    // Reset the database after each test
    await Cart.deleteOne({
      Product: product,
      Account: account,
      CartProductSize: size,
    });
  });

  test("should add a new product to the cart", async () => {
    const product = "642155b4d4e01b8867909b21";
    const account = "6431a079eb45b377ec0d9308";
    const size = "XL";
    const quantity = 2;
    const res = await request(app).post("/products/addCart").send({
      Product: product,
      Account: account,
      CartProductSize: size,
      CartProductQuantity: quantity,
    });

    expect(res.status).toBe(200);
    expect(JSON.stringify(res.body)).toBe(
      JSON.stringify({ message: "Thêm vào giỏ hàng thành công!" })
    );

    const cart = await Cart.findOne({
      Product: product,
      CartProductSize: size,
    });
    expect(cart).not.toBeNull();
    expect(cart.Account.toString()).toBe(account.toString());
    expect(cart.CartProductQuantity).toBe(quantity);
  });

  test("should update the quantity of an existing product in the cart", async () => {
    const product = "642155b4d4e01b8867909b21";
    const account = "6431a079eb45b377ec0d9308";
    const size = "XL";
    const initialQuantity = 2;
    const updatedQuantity = 3;

    const cart = new Cart({
      Product: product,
      Account: account,
      CartProductSize: size,
      CartProductQuantity: initialQuantity,
    });
    await cart.save();

    const res = await request(app).post("/products/addCart").send({
      Product: product,
      Account: account,
      CartProductSize: size,
      CartProductQuantity: updatedQuantity,
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Cập nhật số lượng sản phẩm thành công!");

    const updatedCart = await Cart.findOne({
      Product: product,
      CartProductSize: size,
    });
    expect(updatedCart).not.toBeNull();
    expect(updatedCart.Account.toString()).toBe(account.toString());
    expect(updatedCart.CartProductQuantity).toBe(
      initialQuantity + updatedQuantity
    );
  });

  test("should return 500 if there is a database error", async () => {
    jest.spyOn(Cart, "findOne").mockImplementationOnce(() => {
      throw new Error();
    });

    const res = await request(app).post("/products/addCart");

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Database error");
  });
});
