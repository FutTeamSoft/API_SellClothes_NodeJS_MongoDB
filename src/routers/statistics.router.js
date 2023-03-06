const statisticsController = require("../controllers/statisticsController");
const router = require("express").Router();

//thống kê số lượng sản phẩm
router.get("/getProductStatistics", statisticsController.getProductStatistics);
//thóng kê sô lượng account
router.get("/getAccountStatistics", statisticsController.getAccountStatistics);
//thống kê số lượng hóa đơn
router.get("/getInvoiceStatistics", statisticsController.getInvoiceStatistics);
//thống kê doanh thu thực tế
router.get("/getRevenueStatistics", statisticsController.getRevenueStatistics);
//thống số lượng hóa dơn đã xữ lý
router.get("/getProcessedInvoiceStatistics", statisticsController.getProcessedInvoiceStatistics);

module.exports = router;

