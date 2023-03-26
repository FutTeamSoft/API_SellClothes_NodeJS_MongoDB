const invoiceController = require("../controllers/invoiceController");
const router = require("express").Router();
const authenticateToken = require("./authenticateToken");

router
    .all(authenticateToken)
    .post("/createInvoice/:id",authenticateToken, invoiceController.createInvoice)
    .get("/getInvoiceHistoryByCustomerId/:id",authenticateToken, invoiceController.getInvoiceHistoryByCustomerId);

//add invoice
//get  all invoice
router.get("/getInvoice", invoiceController.getAllInvoices);
//update status invoice
router.put("/updateInvoiceStatus/:invoiceId", invoiceController.updateInvoiceStatus);
//update status invoice
router.put("/updateInvoicePaid/:invoiceId", invoiceController.updateInvoicePaid);

//getInvoiceDetailByInvoiceId
router.get("/getInvoiceDetailByInvoiceId/:InvoiceID", invoiceController.getInvoiceDetailByInvoiceId);
module.exports = router;
