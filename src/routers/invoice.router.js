const invoiceController = require("../controllers/invoiceController");
const router = require("express").Router();

//ADD SIZE PRODUCT
router.post("/createInvoice", invoiceController.createInvoice);
//GET ALL PRODUCT BY SEX AND PRODUCT TYPE
module.exports = router;
