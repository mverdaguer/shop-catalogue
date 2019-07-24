const express = require('express');
var router = express.Router();
const cors = require('cors');

const homeImages = ["lemon.jpg", "coffee.jpg", "sushi.jpg", "vegetables.jpg"];
router.route('/api/home_images/:id')
  .delete(cors(), async (req, res) => {
    res.json({});
  });

router.route('/api/home_images')
  .get(cors(), async (req, res) => {
    res.json(homeImages);
  })
  .post(cors(), async (req, res) => {
    res.json({});
  });

router.post('/api/send', cors(), async (req, res) => {
    res.json({});
  });

module.exports = router;