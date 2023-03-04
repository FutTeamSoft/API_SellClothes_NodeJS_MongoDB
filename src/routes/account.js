const accountController = require("../controllers/accountController");
const userController = require("../controllers/accountController");
const router = require("express").Router();


router.post("/addCustomer", accountController.addCustomer);

module.exports = router;
