const userController = require("../controllers/userController.js");
const authenticateToken = require("./authenticateToken");
const router = require("express").Router();

router
    .all(authenticateToken)
    .put("/updateCustommer/:id",authenticateToken, userController.updateCustomer)
    .get("/getAllAccount",authenticateToken, userController.getAllAccount);

//ADD CUSTOMER
router.post("/addCustomer", userController.addCustomer);
//LOGIN
router.post("/login", userController.loginCustomer);
//UPDATE INFO CUSTOMER BY ID
//ADD FEEDBACK
router.post("/addFeedback", userController.addFeedback);
//GET FEEDBACK
router.get("/getFeedback", userController.getFeedback);
//get all account
//get all account
router.post("/addAdmin", userController.addAdmin);
//LOGIN
router.post("/loginAdmin", userController.loginAdmin);

module.exports = router;
