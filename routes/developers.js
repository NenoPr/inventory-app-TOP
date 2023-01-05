var express = require('express');
var router = express.Router();

const developers_controller = require("../controllers/developersController");

/* GET users listing. */
router.get('/', developers_controller.developers_index);

router.get('/developers_list', developers_controller.developers_list);

module.exports = router;
