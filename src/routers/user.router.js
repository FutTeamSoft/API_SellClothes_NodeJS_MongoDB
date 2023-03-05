const userController = require("../controllers/userController.js");
const router = require("express").Router();

//ADD CUSTOMER
router.post("/addCustomer", userController.addCustomer);
//LOGIN
router.post("/login", userController.loginCustomer);
//UPDATE INFO CUSTOMER BY ID
router.put("/updateCustommer/:id", userController.updateCustomer);
//ADD FEEDBACK
router.post("/addFeedback", userController.addFeedback);
//GET FEEDBACK
router.get("/getFeedback", userController.getFeedback);
//get all account
router.get("/getAllAccount", userController.getAllAccount);
//get all account
router.post("/addAdmin", userController.addAdmin);
//LOGIN
router.post("/loginAdmin", userController.loginAdmin);
module.exports = router;
