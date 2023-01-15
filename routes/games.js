var express = require('express');
var router = express.Router();

const games_controller = require("../controllers/gamesController");

/* Games Front Page. */
router.get('/', games_controller.game_index);

/* List all games */
router.get('/games_list', games_controller.game_list);

/* New Game creation get */
router.get('/create', games_controller.game_create_get);

/* New Game creation post */
router.post('/create', games_controller.game_create_post);


module.exports = router;
