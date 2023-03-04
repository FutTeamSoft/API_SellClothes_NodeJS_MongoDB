const userController = require("../controllers/userController.js");
const router = require("express").Router();

//ADD SIZE PRODUCT
router.post("/AddSizeProduct", userController.addSizeProduct);
//GET ALL SIZE PRODUCT
router.get("/GetAllSize", userController.getAllSize);
router.post("/addCustomer", userController.addCustomer);
router.post("/login", userController.loginCustomer);
router.put("/updateCustommer/:id", userController.updateCustomer);
router.post("/addFeedback", userController.addFeedback);
router.get("/getFeedback", userController.getFeedback);
module.exports = router;
