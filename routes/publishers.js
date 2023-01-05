var express = require('express');
var router = express.Router();

const publishers_controller = require("../controllers/publishersController");

/* GET users listing. */
router.get('/', publishers_controller.publishers_index);

router.get('/publishers_list', publishers_controller.publishers_list);

module.exports = router;
