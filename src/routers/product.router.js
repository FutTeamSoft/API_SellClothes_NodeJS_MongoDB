const productController = require("../controllers/productController");
const router = require("express").Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Sex:
 *       type: object
 *       required:
 *         - NameSex
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the sex
 *         NameSex:
 *           type: string
 *           description: The name of the sex
 *       example:
 *         _id: 61fa1b720d333e497f554e90
 *         NameSex: Male
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     ProductType:
 *       type: object
 *       required:
 *         - NameProductType
 *         - Sex
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the product type
 *         NameProductType:
 *           type: string
 *           description: The name of the product type
 *         Sex:
 *           type: array
 *           items:
 *             type: string
 *             description: The ID of the sex associated with the product type
 *           description: The sex(es) associated with the product type
 *       example:
 *         _id: 60c5417be6ca2042746c5635
 *         NameProductType: "Sneakers"
 *         Sex: ["60c5417be6ca2042746c5634"]
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ImageProduct:
 *       type: object
 *       required:
 *         - TenHinh
 *         - DuongDanHinh
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the image
 *         TenHinh:
 *           type: string
 *           description: The name of the image
 *         DuongDanHinh:
 *           type: string
 *           description: The path of the image
 *       example:
 *         _id: 60c5417be6ca2042746c5635
 *         TenHinh: "sneakers-1.jpg"
 *         DuongDanHinh: "/public/images/sneakers-1.jpg"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SizeProduct:
 *       type: object
 *       required:
 *         - TenSize
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the size product
 *         TenSize:
 *           type: string
 *           description: The name of the size product
 *       example:
 *         _id: 6096fb537d02b38d4818d1f2
 *         TenSize: S
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - NameProduct
 *         - PriceProduct
 *         - ImageProduct
 *         - ProductType
 *         - StatusProduct
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the product
 *         NameProduct:
 *           type: string
 *           description: The name of the product
 *         PriceProduct:
 *           type: number
 *           description: The price of the product
 *         ImageProduct:
 *           type: string
 *           description: The ID of the image associated with the product
 *         CreateDate:
 *           type: string
 *           format: date-time
 *           description: The date the product was created
 *         UpdateDate:
 *           type: string
 *           format: date-time
 *           description: The date the product was last updated
 *         Description:
 *           type: string
 *           description: A short description of the product
 *         StatusProduct:
 *           type: integer
 *           description: The status of the product
 *           enum: [0, 1]
 *           default: 1
 *         ProductType:
 *           type: string
 *           description: The ID of the product type associated with the product
 *       example:
 *         _id: 60c54180e6ca2042746c5637
 *         NameProduct: "Nike Air Max 270 React"
 *         PriceProduct: 200
 *         ImageProduct: "60c5417be6ca2042746c5636"
 *         CreateDate: 2021-06-12T10:15:00.000Z
 *         UpdateDate: 2021-06-13T14:30:00.000Z
 *         Description: "A stylish and comfortable sneaker."
 *         StatusProduct: 1
 *         ProductType: "60c5417be6ca2042746c5635"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductDetail:
 *       type: object
 *       required:
 *         - Product
 *         - SoLuongTon
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the product detail
 *         Product:
 *           type: string
 *           description: The id of the associated product
 *         SizeProduct:
 *           type: string
 *           description: The id of the associated size product
 *         SoLuongTon:
 *           type: number
 *           description: The quantity of the product in stock
 *           minimum: 0
 *       example:
 *         _id: 60c5417be6ca2042746c5636
 *         Product: 60c5417be6ca2042746c5637
 *         SizeProduct: 60c5417be6ca2042746c5638
 *         SoLuongTon: 20
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product detail
 *         product:
 *           type: string
 *           description: The product ID that the detail belongs to
 *         sizeProduct:
 *           type: string
 *           description: The size product ID of the detail
 *         soLuongTon:
 *           type: number
 *           description: The quantity in stock for the detail
 *       example:
 *         id: abc123
 *         product: Product
 *         sizeProduct: S
 *         soLuongTon: 6
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AdminAccount:
 *       type: object
 *       required:
 *         - UserNameAdmin
 *         - PasswordAdmin
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the admin account
 *         UserNameAdmin:
 *           type: string
 *           description: The username of the admin account
 *         PasswordAdmin:
 *           type: string
 *           description: The password of the admin account
 *       example:
 *         id: 1
 *         UserNameAdmin: admin1
 *         PasswordAdmin: password123
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FeedBack:
 *       type: object
 *       required:
 *         - FullNameUserFeedBack
 *         - EmailUserFeedBack
 *         - DescribeFeedBack
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the feedback
 *         FullNameUserFeedBack:
 *           type: string
 *           description: The full name of the user giving feedback
 *         EmailUserFeedBack:
 *           type: string
 *           description: The email of the user giving feedback
 *         DescribeFeedBack:
 *           type: string
 *           description: The description of the feedback given by the user
 *       example:
 *         _id: 60c5417be6ca2042746c5636
 *         FullNameUserFeedBack: John Doe
 *         EmailUserFeedBack: john.doe@example.com
 *         DescribeFeedBack: This is my feedback about the product.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       required:
 *         - FullName
 *         - Email
 *         - PhoneNumber
 *         - AddressUser
 *         - PasswordUser
 *         - StatusAccount
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the account
 *         FullName:
 *           type: string
 *           description: The full name of the user
 *         Email:
 *           type: string
 *           description: The email of the user
 *         PhoneNumber:
 *           type: number
 *           description: The phone number of the user
 *         AddressUser:
 *           type: string
 *           description: The address of the user
 *         PasswordUser:
 *           type: string
 *           description: The password of the user
 *         StatusAccount:
 *           type: number
 *           description: The status of the user's account
 *           enum: [0, 1]
 *           default: 1
 *       example:
 *         _id: 60c5417be6ca2042746c5636
 *         FullName: John Doe
 *         Email: john.doe@example.com
 *         PhoneNumber: 123456789
 *         AddressUser: 123 Main Street
 *         PasswordUser: password123
 *         StatusAccount: 1
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       required:
 *         - InvoiceNameReceiver
 *         - InvoiceAddressReceiver
 *         - InvoicePhoneReceiver
 *         - InvoiceDate
 *         - TotalInvoice
 *         - PaymentsInvoice
 *         - StatusInvoice
 *         - Paid
 *         - AccountID
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the invoice
 *         InvoiceNameReceiver:
 *           type: string
 *           description: The name of the receiver of the invoice
 *         InvoiceAddressReceiver:
 *           type: string
 *           description: The address of the receiver of the invoice
 *         InvoicePhoneReceiver:
 *           type: number
 *           description: The phone number of the receiver of the invoice
 *         InvoiceDate:
 *           type: string
 *           format: date-time
 *           description: The date the invoice was created
 *         TotalInvoice:
 *           type: number
 *           description: The total amount of the invoice
 *           default: 0
 *         PaymentsInvoice:
 *           type: string
 *           description: The payment method used for the invoice
 *         StatusInvoice:
 *           type: number
 *           description: The status of the invoice
 *           enum: [0, 1]
 *           default: 1
 *         Paid:
 *           type: number
 *           description: Whether or not the invoice has been paid
 *           enum: [0, 1]
 *           default: 1
 *         NoteInvoice:
 *           type: string
 *           description: Any additional notes about the invoice
 *         AccountID:
 *           type: string
 *           description: The id of the account associated with the invoice
 *           format: uuid
 *           example: 60c5417be6ca2042746c5636
 *       example:
 *         _id: 60c5417be6ca2042746c5636
 *         InvoiceNameReceiver: Jane Doe
 *         InvoiceAddressReceiver: 123 Main Street
 *         InvoicePhoneReceiver: 123456789
 *         InvoiceDate: 2022-03-26T10:00:00.000Z
 *         TotalInvoice: 1000
 *         PaymentsInvoice: credit card
 *         StatusInvoice: 1
 *         Paid: 0
 *         NoteInvoice: Payment due in 30 days
 *         AccountID: 60c5417be6ca2042746c5636
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     InvoiceDetails:
 *       type: object
 *       required:
 *         - SizeProductID
 *         - ProductID
 *         - InvoiceID
 *         - Quantity
 *         - UnitPrice
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the invoice detail
 *         SizeProductID:
 *           type: string
 *           description: The id of the size product detail
 *         ProductID:
 *           type: string
 *           description: The id of the product detail
 *         InvoiceID:
 *           type: string
 *           description: The id of the invoice
 *         Quantity:
 *           type: number
 *           description: The quantity of the product in the invoice detail
 *         UnitPrice:
 *           type: number
 *           description: The unit price of the product in the invoice detail
 *       example:
 *         id: 1
 *         SizeProductID: 5f3be5c7a824f700176b6c71
 *         ProductID: 5f3be5c7a824f700176b6c72
 *         InvoiceID: 5f3be5c7a824f700176b6c73
 *         Quantity: 2
 *         UnitPrice: 12.99
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - Product
 *         - Account
 *         - CartProductSize
 *         - CartProductQuantity
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the cart item
 *         Product:
 *           type: string
 *           description: The id of the product in the cart
 *         Account:
 *           type: string
 *           description: The id of the account that owns the cart
 *         CartProductSize:
 *           type: string
 *           description: The size of the product in the cart
 *         CartProductQuantity:
 *           type: number
 *           description: The quantity of the product in the cart
 *       example:
 *         id: 1
 *         Product: 5f3be5c7a824f700176b6c72
 *         Account: 5f3be5c7a824f700176b6c74
 *         CartProductSize: M
 *         CartProductQuantity: 2
 */
/**
 * @swagger
 *   tags:
 *      name: Products
 *      description: The product managing API
 * /products/AddSizeProduct:
 *   post:
 *     tags: [Products]
 *     summary: Add size to a product
 *     description: Add a size option to a product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TenSize:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 * /products/GetAllSize:
 *   get:
 *     tags: [Products]
 *     summary: Get all sizes of products
 *     description: Retrieve a list of all available sizes for products.
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 * /products/deleteSize/{idProductSize}:
 *   delete:
 *     tags: [Products]
 *     summary: Delete a size of a product
 *     description: Delete a size option from a product.
 *     parameters:
 *       - in: path
 *         name: idProductSize
 *         required: true
 *         description: ID of the size product to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 * /products/GetAllProduct:
 *   get:
 *     tags: [Products]
 *     summary: Get all products
 *     description: Retrieve a list of all available products.
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 * /products/GetAllProductDetail:
 *   get:
 *     tags: [Products]
 *     summary: Get all product details
 *     description: Retrieve a list of all available product details.
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 * /products/AddProduct:
 *   post:
 *     tags: [Products]
 *     summary: Add a new product
 *     description: Add a new product to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 * /products/GetAllSex:
 *   get:
 *     tags: [Products]
 *     summary: Get all sex
 *     description: Get all available sex from the database.
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 * /products/AddSex:
 *   post:
 *     tags: [Products]
 *     summary: Add a new sex
 *     description: Add a new sex to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NameSex:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 * /products/GetAllProductType:
 *   get:
 *     tags: [Products]
 *     summary: Get all product types
 *     description: Get a list of all product types from the database.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductType'
 *       400:
 *         description: Bad Request
 * /products/AddProductType:
 *   post:
 *     summary: Add a new product type
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NameProductType:
 *                 type: string
 *                 description: The name of the product type
 *                 example: T-Shirt
 *               Sex:
 *                 type: string
 *                 example: 64037daa1737e2c7c1a2482e
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 * /products/deleteProductType/{idProductType}:
 *   delete:
 *     summary: Delete a product type by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: idProductType
 *         schema:
 *           type: string
 *         required: true
 *         description: Numeric ID of the product type to delete
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 * /products/GetAllProductBySex/{NameSex}:
 *   get:
 *     summary: Get all products by sex name
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: NameSex
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the sex
 *         example: Male
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 * /products/GetAllProductByIDSex/{IDSex}:
 *   get:
 *     summary: Get all products by sex ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: IDSex
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the sex
 *         example: 640c486af339b866d479ea4d
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 * /products/latest/{quality}:
 *   get:
 *     summary: Get new products by quality
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: quality
 *         schema:
 *           type: integer
 *         required: true
 *         description: The quality of the products to retrieve
 *         example: 5
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 * /products/GetAllProByIDSexAndType/{IDSex}/{IDProductType}:
 *   get:
 *     summary: Get all products by IDSex and IDProductType
 *     description: Get a list of all products that match the given IDSex and IDProductType.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: IDSex
 *         description: ID of the sex
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: IDProductType
 *         description: ID of the product type
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 * /products/getProductsByName/{name}:
 *   get:
 *     summary: Get new products by name
 *     description: Get a list of new products that match the given name.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: name
 *         description: Name of the product
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 * /products/addProductDetails:
 *   post:
 *     summary: Add product details
 *     description: Add details for a new product.
 *     tags:
 *       - Products
 *     requestBody:
 *       description: Product details to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Product:
 *                 type: string
 *               SizeProduct:
 *                 type: string
 *               SoLuongTon:
 *                 type: number
 *             example:
 *               Product: 642155f4d4e01b8867909b23
 *               SizeProduct: 6401dd293ea3e07b76538e6e
 *               SoLuongTon: 100
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 * /products/GetDetailProductByID/{idProduct}:
 *   get:
 *     summary: Get product details by ID
 *     description: Get details of a product by its ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: idProduct
 *         description: ID of the product to retrieve details for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 Product:
 *                   type: string
 *                 SizeProduct:
 *                   type: string
 *                 SoLuongTon:
 *                   type: number
 *               example:
 *                 id: 64215b060593c4c792026fc5
 *                 Product: 64215b060593ssc792026fc5
 *                 SizeProduct: S
 *                 SoLuongTon: 9999
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 * /products/addCart:
 *   post:
 *     summary: Add a product to the cart
 *     description: Add a product to the cart with the given product ID and quantity.
 *     tags:
 *       - Cart
 *     requestBody:
 *       description: The ID of the product and quantity to add to the cart.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Product:
 *                 type: string
 *               Account:
 *                 type: string
 *               CartProductSize:
 *                 type: string
 *               CartProductQuantity:
 *                 type: int
 *             example:
 *               Product: 640c486af339b866d479ea4d
 *               Account: 641aa95aed6539dd980a6765
 *               CartProductSize: XL
 *               CartProductQuantity: 2
 *     responses:
 *       201:
 *         description: The product was successfully added to the cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *               example:
 *                 message: Product added to cart successfully
 *       400:
 *         description: Invalid request body or product ID
 *       500:
 *         description: An error occurred while adding the product to the cart
 * /products/GetCartByAccID/{idAccount}:
 *   get:
 *     summary: Get the cart for the given account ID
 *     description: Retrieve the cart for the account with the given ID.
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: path
 *         name: idAccount
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the account to retrieve the cart for.
 *         example: 12345
 *     responses:
 *       200:
 *         description: The cart for the account was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Invalid account ID
 *       404:
 *         description: The cart for the account was not found
 *       500:
 *         description: An error occurred while retrieving the cart
 * /products/updateCart/{idCart}:
 *   patch:
 *     summary: Update the quantity of a product in the cart
 *     description: Update the quantity of the product with the given ID in the cart with the given cart ID.
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: path
 *         name: idCart
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the cart to update.
 *         example: 6420707dcf84e4e404af07f4
 *       - in: body
 *         name: cartItem
 *         description: The cart item to update.
 *         schema:
 *           type: object
 *           properties:
 *             CartProductQuantity:
 *               type: integer
 *           required:
 *             - CartProductQuantity
 *           example:
 *             CartProductQuantity: 8
 *     responses:
 *       200:
 *         description: The cart item was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Invalid cart or cart item data
 *       404:
 *         description: The cart or cart item was not found
 *       500:
 *         description: An error occurred while updating the cart item
 * /products/DeleteCartByID/{idCart}:
 *   delete:
 *     summary: Delete a product from the cart by ID
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: idCart
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product in the cart to delete
 *         example: 6421498a9deae1f951dcb220
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 * /products/DeleteAllProductInCart/{idAccount}:
 *   delete:
 *     summary: Delete all products in the cart by account ID
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: idAccount
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the account whose cart will be cleared
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 * /products/getProductByIDProduct/{idProduct}:
 *   get:
 *     summary: Get product by ID product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: idProduct
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to retrieve
 *         example: 6421498a9deae1f951dcb220
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 * /products/getSizeByProduct/{idProduct}:
 *   get:
 *     summary: Get all sizes of a product by product ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: idProduct
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to retrieve sizes for
 *         example: 6421498a9deae1f951dcb220
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
//ADD SIZE PRODUCT
router.post("/AddSizeProduct", productController.addSizeProduct); //Swagger
//GET ALL SIZE PRODUCT
router.get("/GetAllSize", productController.getAllSize); //Swagger
//DELETE SIZE PRODUCT
router.delete("/deleteSize/:idProductSize", productController.deleteSize); //Swagger
//GET ALL PRODUCT
router.get("/GetAllProduct", productController.getAllProduct); //Swagger
//GET ALL PRODUCT DETAIL
router.get("/GetAllProductDetail", productController.getAllProductDetail); //Swagger
//ADD PRODUCT
router.post("/AddProduct", productController.addProduct); //Swagger
//GET SEX
router.get("/GetAllSex", productController.getAllSex); //Swagger
//ADD SEX
router.post("/AddSex", productController.addSex); //Swagger
//GET ALL PRODUCT TYPE
router.get("/GetAllProductType", productController.getAllProductType); //Swagger
//ADD PRODUCT TYPE
router.post("/AddProductType", productController.addProductType); //Swagger
//DELETE PRODUCT TYPE
router.delete(
  "/deleteProductType/:idProductType",
  productController.deleteProductType //Swagger
);
//GET ALL PRODUCT BY NameSex
router.get(
  "/GetAllProductBySex/:NameSex",
  productController.getAllProductBySex //Swagger
);
//GET ALL PRODUCT BY IDSEX
router.get(
  "/GetAllProductByIDSex/:IDSex",
  productController.getAllProductByIDSex //Swagger
);
//get new prodcut by quality
router.get("/latest/:quality", productController.getProductsByquality); //Swagger
//GET ALL PRODUCT BY SEX AND PRODUCT TYPE
router.get(
  "/getAllProductBySexAndPType",
  productController.getAllProductBySexAndPType
);
//GET ALL PRODUCT BY IDSEX AND IDPRODUCTTYPE
router.get(
  "/GetAllProByIDSexAndType/:IDSex/:IDProductType", //Swagger
  productController.getAllProductByIDSexAndIDType
);
//get new prodcut by quality
router.get("/getProductsByName/:name", productController.getProductsByName); //Swagger
//Add product Details
router.post("/addProductDetails", productController.addProductDetails); //Swagger
//Get Detail Product By ID
router.get(
  "/GetDetailProductByID/:idProduct",
  productController.getProductDetailByIDProduct //Swagger
);
//Add Cart
router.post("/addCart", productController.addProductIntoCart); //Swagger
//Get Cart By Account ID
router.get("/GetCartByAccID/:idAccount", productController.getCartByIDAccount); //Swagger
//Update Quantity In Card
router.patch("/updateCart/:idCart", productController.updateCart); //Swagger
//Delete sản phẩm theo id
router.delete("/DeleteCartByID/:idCart", productController.deleteProductInCart); //Swagger
//Delete All Product In Cart
router.delete(
  "/DeleteAllProductInCart/:idAccount",
  productController.deleteAllProductAllCart //Swagger
);
//Get Product By ID Product
router.get(
  "/getProductByIDProduct/:idProduct",
  productController.getProductByIDProduct //Swagger
);
//Get All Size Product By Product ID
router.get("/getSizeByProduct/:idProduct", productController.getSizeByProduct);
module.exports = router;
