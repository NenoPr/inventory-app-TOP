var express = require('express');
var router = express.Router();

const developers_controller = require("../controllers/developersController");

/* Developer index GET */
router.get('/', developers_controller.developers_index);

/* Developer List GET */
router.get('/developers_list', developers_controller.developers_list);

/* New Developer creation get */
router.get('/create', developers_controller.developers_create_get);

/* New Developer creation post */
router.post('/create', developers_controller.developers_create_post);

module.exports = router;
