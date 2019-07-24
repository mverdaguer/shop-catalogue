const express = require('express');
var router = express.Router();
const cors = require('cors');

const categories = [
  { id: 1, name: "carbohydrates", parent_category: null },
  { id: 2, name: "vegetables", parent_category: null },
  { id: 3, name: "fruit", parent_category: null },
  { id: 6, name: "grains", parent_category: 1 },
  { id: 7, name: "legumes", parent_category: 1 },
  { id: 8, name: "beans", parent_category: 7 }
];

router.route('/api/categories/:id')
  .patch(cors(), async (req, res) => {
    res.json({});
  })
  .delete(cors(), async (req, res) => {
    res.json({});
  });

router.route('/api/categories')
  .get(cors(), async (req, res) => {
    res.json(categories);
  })
  .post(cors(), async (req, res) => {
    res.json({});
  });

module.exports = router;