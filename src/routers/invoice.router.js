const invoiceController = require("../controllers/invoiceController");
const router = require("express").Router();
const authenticateToken = require("./authenticateToken");
/**
 * @swagger
 * /invoices//createInvoice/{id}:
 *   post:
 *     summary: Create invoice
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer id
 *         example: 6404a1af32ad403ed0eceb18
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *
 * /invoices/getInvoiceHistoryByCustomerId/{id}:
 *   get:
 *     summary: Get invoice history by customer id
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer id
 *         example: 6404a1af32ad403ed0eceb18
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 * /invoices/getInvoice:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 * /invoices/updateInvoiceStatus/{invoiceId}:
 *   put:
 *     summary: Update invoice status
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the invoice to update
 *         example: 6404a1af32ad403ed0eceb18
 *       - in: body
 *         name: invoiceStatus
 *         description: The new status of the invoice
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               description: The new status value
 *               example: "paid"
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 * /invoices/updateInvoicePaid/{invoiceId}:
 *   put:
 *     summary: Update invoice payment status
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the invoice to update payment status for
 *         example: 6404a1af32ad403ed0eceb18
 *       - in: body
 *         name: body
 *         description: Payment status information
 *         schema:
 *           type: object
 *           properties:
 *             isPaid:
 *               type: boolean
 *               description: The payment status of the invoice
 *               example: true
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 * /invoices/getInvoiceDetailByInvoiceId/{InvoiceID}:
 *   get:
 *     summary: Get invoice detail by invoice id
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: InvoiceID
 *         schema:
 *           type: string
 *         required: true
 *         description: The invoice id
 *         example: 6404a1af32ad403ed0eceb18
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router
  .all(authenticateToken)
  .post(
    "/createInvoice/:id",
    authenticateToken,
    invoiceController.createInvoice
  )
  .get(
    "/getInvoiceHistoryByCustomerId/:id",
    authenticateToken,
    invoiceController.getInvoiceHistoryByCustomerId //Swagger
  );

//add invoice

//get  all invoice
router.get("/getInvoice", invoiceController.getAllInvoices); //Swagger
//update status invoice
router.put(
  "/updateInvoiceStatus/:invoiceId",
  invoiceController.updateInvoiceStatus //Swagger
);
//update status invoice
router.put(
  "/updateInvoicePaid/:invoiceId",
  invoiceController.updateInvoicePaid //Swagger
);

//getInvoiceDetailByInvoiceId
router.get(
  "/getInvoiceDetailByInvoiceId/:InvoiceID",
  invoiceController.getInvoiceDetailByInvoiceId //Swagger
);
module.exports = router;
