const userController = require("../controllers/userController.js");
const authenticateToken = require("./authenticateToken");
const router = require("express").Router();
/**
 *@swagger
 * /users/updateCustommer/{id}:
 *     put:
 *       summary: Update a customer
 *       tags: [User]
 *       parameters:
 *         - in: path
 *           name: id
 *           description: The ID of the customer to update
 *           required: true
 *           schema:
 *             type: string
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Include the properties that can be updated here
 *               required:
 *                 // List the required properties here
 *       responses:
 *         '200':
 *           description: Success
 *         '400':
 *           description: Bad request
 *         '401':
 *           description: Unauthorized
 *
 * /users/getAllAccount:
 *     get:
 *       summary: Get all accounts
 *       tags: [User]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Success
 *         '401':
 *           description: Unauthorized
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /users/addCustomer:
 *   post:
 *     summary: Add a new customer
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Include the properties of the customer here
 *             required:
 *               // List the required properties here
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 * /users/login:
 *   post:
 *     summary: Login to the application
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *                 description: The email address of the user.
 *               PasswordUser:
 *                 type: string
 *                 description: The password of the user.
 *             example:
 *               email: john@example.com
 *               password: password123
 *     responses:
 *       '200':
 *         description: Successfully logged in.
 *       '401':
 *         description: Invalid credentials.
 *       '500':
 *         description: Internal Server Error.
 * /users/addFeedback:
 *   post:
 *     summary: Add feedback
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Include the properties for the feedback here
 *             required:
 *               // List the required properties for the feedback here
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 * /users/getFeedback:
 *   get:
 *     summary: Get feedback
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 * /users/addAdmin:
 *   post:
 *     summary: Add admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserNameAdmin:
 *                 type: string
 *               PasswordAdmin:
 *                 type: string
 *             required:
 *               - UserNameAdmin
 *               - PasswordAdmin
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 * /users/loginAdmin:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserNameAdmin:
 *                 type: string
 *               PasswordAdmin:
 *                 type: string
 *             required:
 *               - UserNameAdmin
 *               - PasswordAdmin
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 * /users/updatePasswordWithEmail/{email}:
 *     post:
 *       summary: Update password with email
 *       tags: [User]
 *       parameters:
 *         - in: path
 *           name: email
 *           description: The email of the user to update password
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 password:
 *                   type: string
 *               required:
 *                 - password
 *       responses:
 *         '200':
 *           description: Success
 *         '400':
 *           description: Bad request
 */

router
  .all(authenticateToken)
  .put("/updateCustommer/:id", authenticateToken, userController.updateCustomer) //swagger
  .get("/getAllAccount", authenticateToken, userController.getAllAccount);

//ADD CUSTOMER
router.post("/addCustomer", userController.addCustomer); //swagger
//LOGIN
router.post("/login", userController.loginCustomer); //swagger
//UPDATE INFO CUSTOMER BY ID
//ADD FEEDBACK
router.post("/addFeedback", userController.addFeedback); //swagger
//GET FEEDBACK
router.get("/getFeedback", userController.getFeedback); //swagger
//get all account
router.post("/addAdmin", userController.addAdmin); //swagger
//LOGIN
router.post("/loginAdmin", userController.loginAdmin); //swagger
router.post(
  "/updatePasswordWithEmail/:email",
  userController.updatePasswordWithEmail
);

module.exports = router;
