var express = require('express');
var router = express.Router();

const platform_controller = require("../controllers/platformsController");

/* GET users listing. */
router.get('/', platform_controller.platform_index);

router.get('/platforms_list', platform_controller.platforms_list);

/* New platform creation get */
router.get('/create', platform_controller.platforms_create_get);

/* New platform creation post */
router.post('/create', platform_controller.platforms_create_post);


module.exports = router;


