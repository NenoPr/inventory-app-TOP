var express = require('express');
var router = express.Router();

const platform_controller = require("../controllers/platformsController");

/* GET users listing. */
router.get('/', platform_controller.platform_index);

router.get('/platforms_list', platform_controller.platforms_list);


module.exports = router;


