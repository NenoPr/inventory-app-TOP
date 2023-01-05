var express = require('express');
var router = express.Router();

const games_controller = require("../controllers/gamesController");

/* GET users listing. */
router.get('/', games_controller.game_index);

router.get('/games_list', games_controller.game_list);

module.exports = router;
