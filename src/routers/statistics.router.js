const statisticsController = require("../controllers/statisticsController");
const router = require("express").Router();
/**
 * @swagger
 * /statistics/getProductStatistics:
 *   get:
 *     summary: Get product statistics
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 *
 * /statistics/getAccountStatistics:
 *   get:
 *     summary: Get account statistics
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 * /statistics/getInvoiceStatistics:
 *   get:
 *     summary: Get invoice statistics
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 * /statistics/getRevenueStatistics:
 *   get:
 *     summary: Get revenue statistics
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 * /statistic/getProcessedInvoiceStatistics:
 *   get:
 *     summary: Get processed invoice statistics
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */

//thống kê số lượng sản phẩm
router.get("/getProductStatistics", statisticsController.getProductStatistics); //swagger
//thóng kê sô lượng account
router.get("/getAccountStatistics", statisticsController.getAccountStatistics); //swagger
//thống kê số lượng hóa đơn
router.get("/getInvoiceStatistics", statisticsController.getInvoiceStatistics); //swagger
//thống kê doanh thu thực tế
router.get("/getRevenueStatistics", statisticsController.getRevenueStatistics); //swagger
//thống số lượng hóa dơn đã xữ lý
router.get(
  "/getProcessedInvoiceStatistics",
  statisticsController.getProcessedInvoiceStatistics //swagger
);

module.exports = router;
