const express = require('express');
var router = express.Router();
const cors = require('cors');

const items = [
  { id: 1, name: "lentils", image: ".jpg", category: { id: 7, name: 'legumes' }, supplier: {} },
  { id: 2, name: "chickpeas", image: ".jpg", category: { id: 7, name: 'legumes' }, supplier: {} },
  { id: 3, name: "peas", image: ".jpg", category: { id: 7, name: 'legumes' }, supplier: {} },
  { id: 4, name: "kidney beans", image: ".jpg", category: { id: 8, name: 'beans' }, supplier: {} },
  { id: 5, name: "black beans", image: ".jpg", category: { id: 8, name: 'beans' }, supplier: {} },
  { id: 6, name: "soybeans", image: ".jpg", category: { id: 8, name: 'beans' }, supplier: {} },
  { id: 7, name: "pinto beans", image: ".jpg", category: { id: 8, name: 'beans' }, supplier: {} },
  { id: 8, name: "navy beans", image: ".jpg", category: { id: 8, name: 'beans' }, supplier: {} },
  { id: 9, name: "peanuts", image: ".jpg", category: { id: 7, name: 'legumes' }, supplier: {} },
  { id: 10, name: "brown rice", image: ".jpg", category: { id: 6, name: 'grains' }, supplier: {} },
  { id: 11, name: "freekeh", image: ".jpg", category: { id: 6, name: 'grains' }, supplier: {} },
  { id: 12, name: "grapefruit", image: ".jpg", category: { id: 3, name: 'fruit' }, supplier: {} },
  { id: 13, name: "strawberry", image: ".jpg", category: { id: 3, name: 'fruit' }, supplier: {} },
  { id: 14, name: "watermelon", image: ".jpg", category: { id: 3, name: 'fruit' }, supplier: {} },
  { id: 15, name: "papaya", image: ".jpg", category: { id: 3, name: 'fruit' }, supplier: {} },
  { id: 16, name: "carrot", image: ".jpg", category: { id: 2, name: 'vegetables' }, supplier: {} },
  { id: 17, name: "broccoli", image: ".jpg", category: { id: 2, name: 'vegetables' }, supplier: {} },
  { id: 18, name: "asparagus", image: ".jpg", category: { id: 2, name: 'vegetables' }, supplier: {} },
];

router.get('/api/items/:id/edit', cors(), async (req, res) => {
  const item = items.find(i => i.id == req.params.id) || {};
  res.json(item);
});

router.route('/api/items/:id')
  .patch(cors(), async (req, res) => {
    res.json({});
  })
  .delete(cors(), async (req, res) => {
    res.json({});
  });

router.route('/api/items')
  .get(cors(), async (req, res) => {
    res.json(items);
  })
  .post(cors(), async (req, res) => {
    res.json({});
  });

module.exports = router;