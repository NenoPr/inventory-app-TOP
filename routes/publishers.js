var express = require('express');
var router = express.Router();

const publishers_controller = require("../controllers/publishersController");

/* GET users listing. */
router.get('/', publishers_controller.publishers_index);

router.get('/publishers_list', publishers_controller.publishers_list);

/* New Publisher creation get */
router.get('/create', publishers_controller.publishers_create_get);

/* New Publisher creation post */
router.post('/create', publishers_controller.publishers_create_post);

module.exports = router;
