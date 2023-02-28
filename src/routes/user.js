const userController = require("../controllers/userController.js");
const router = require("express").Router();

//ADD SIZE PRODUCT
router.post("/AddSizeProduct", userController.addSizeProduct);
module.exports = router;
