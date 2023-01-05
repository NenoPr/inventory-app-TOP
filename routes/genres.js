var express = require('express');
var router = express.Router();

const genre_controller = require("../controllers/genresController");

/* GET users listing. */
router.get('/', genre_controller.genres_index);

router.get('/genres_list', genre_controller.genres_list);


module.exports = router;


