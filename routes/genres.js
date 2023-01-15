var express = require('express');
var router = express.Router();

const genre_controller = require("../controllers/genresController");

/* GET users listing. */
router.get('/', genre_controller.genres_index);

router.get('/genres_list', genre_controller.genres_list);

/* New genre creation get */
router.get('/create', genre_controller.genre_create_get);

/* New genre creation post */
router.post('/create', genre_controller.genre_create_post);


module.exports = router;


