const uploadFile = require("../middleware/upload.js");
const fs = require("fs");
const baseUrl = "https://ptud-api.fteamlp.top/images/files/";

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    res.status(200).send({
      error: false,
      message: "Uploaded the file successfully: " + req.file.originalname,
      filename: req.file.originalname,
      url: baseUrl + req.file.originalname,
    });
  } catch (err) {
    console.log(err);
    if (err.code == 20 * 1024 * 1024) {
      return res.status(500).send({
        error: true,
        message: "File size cannot be larger than 20MB!",
      });
    }
    res.status(500).send({
      error: true,
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        error: true,
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        error: true,
        message: "Could not download the file. " + err,
      });
    }
  });
};

const remove = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        error: true,
        message: "Could not delete the file. " + err,
      });
    }

    res.status(200).send({
      error: false,
      message: "Đã xóa File thành công!.",
    });
  });
};

const removeSync = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  try {
    fs.unlinkSync(directoryPath + fileName);

    res.status(200).send({
      error: true,
      message: "File is deleted.",
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: "Could not delete the file. " + err,
    });
  }
};

module.exports = {
  upload,
  getListFiles,
  download,
  remove,
  removeSync,
};
