const accountController = require("../controllers/accountController");
const router = require("express").Router();


router.post("/addCustomer", accountController.addCustomer);
router.post("/login", accountController.loginCustomer);

module.exports = router;
