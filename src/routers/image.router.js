const [invoiceController, imageController] = [
  require("../controllers/fileController"),
  require("../controllers/imageController"),
];

const router = require("express").Router();
//UPLOAD HÌNH VÀO HOST
router.post("/upload", invoiceController.upload);
//LẤY DANH SÁCH HÌNH TRONG HOST
router.get("/files", invoiceController.getListFiles);
//LẤY HÌNH THEO TÊN HÌNH TRONG HOST
router.get("/files/:name", invoiceController.download);
//XÓA HÌNH THEO TÊN HÌNH
router.delete("/files/:name", invoiceController.remove);
//THÊM TÊN HÌNH VÀ ĐƯỜNG DẪN HÌNH VÀO DATABASE
router.post("/AddImage", imageController.addImageProduct);
//LẤY TẤT CẢ HÌNH TRONG DATABASE
router.get("/GetAllImage", imageController.getAllImage);
//XÓA HÌNH THEO ID TRONG DATABASE
router.delete("/DelImageByID/:IDImage", imageController.delImgByID);
module.exports = router;
