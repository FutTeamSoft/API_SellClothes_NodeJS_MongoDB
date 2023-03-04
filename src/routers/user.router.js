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
module.exports = router;
