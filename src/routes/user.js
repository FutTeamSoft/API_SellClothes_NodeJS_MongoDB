const userController = require("../controllers/userController.js");
const router = require("express").Router();

//ADD SIZE PRODUCT
router.post("/AddSizeProduct", userController.addSizeProduct);
//GET ALL SIZE PRODUCT
router.get("/GetAllSize", userController.getAllSize);
module.exports = router;
