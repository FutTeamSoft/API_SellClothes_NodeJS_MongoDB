const [invoiceController, imageController] = [
  require("../controllers/fileController"),
  require("../controllers/imageController"),
];
/**
 * @swagger
 * /images/upload:
 *   post:
 *     summary: Upload image to host
 *     tags: [Images]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 * /images/AddImage:
 *   post:
 *     summary: Add image to database
 *     tags: [Images]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               TenHinh:
 *                 type: string
 *               DuongDanHinh:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 * /images/files/{name}:
 *   get:
 *     summary: Download image by name
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: The name of the image to download
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Image not found
 *   delete:
 *     summary: Remove image by name
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: The name of the image to remove
 *     responses:
 *       204:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Image not found
 * /images/files:
 *   get:
 *     summary: Get list of image files
 *     tags: [Images]
 *     responses:
 *       200:
 *         description: List of image files successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the image file
 *                   url:
 *                     type: string
 *                     description: The URL of the image file
 *       500:
 *         description: Internal Server Error
 * /images/GetAllImage:
 *   get:
 *     summary: Get all images from database
 *     tags: [Images]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The name of the image file
 *                   TenHinh:
 *                     type: string
 *                     description: The URL of the image file
 *                   DuongDanHinh:
 *                     type: string
 *                     description: The URL of the image file
 *       500:
 *         description: Internal Server Error
 * /images/DelImageByID/{IDImage}:
 *   delete:
 *     summary: Delete an image by ID
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: IDImage
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the image to delete
 *         example: 64215230d4e01b8867909ac2
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
const router = require("express").Router();
//UPLOAD HÌNH VÀO HOST
router.post("/upload", invoiceController.upload); //Swagger
//LẤY DANH SÁCH HÌNH TRONG HOST
router.get("/files", invoiceController.getListFiles); //Swagger
//LẤY HÌNH THEO TÊN HÌNH TRONG HOST
router.get("/files/:name", invoiceController.download); //Swagger
//XÓA HÌNH THEO TÊN HÌNH
router.delete("/files/:name", invoiceController.remove); //Swagger
//THÊM TÊN HÌNH VÀ ĐƯỜNG DẪN HÌNH VÀO DATABASE
router.post("/AddImage", imageController.addImageProduct); //Swagger
//LẤY TẤT CẢ HÌNH TRONG DATABASE
router.get("/GetAllImage", imageController.getAllImage); //Swagger
//XÓA HÌNH THEO ID TRONG DATABASE
router.delete("/DelImageByID/:IDImage", imageController.delImgByID); //Swagger
module.exports = router;
