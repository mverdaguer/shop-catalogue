const express = require('express');
var router = express.Router();
const cors = require('cors');

const suppliers = [
  { id: 1, name: "supplier 1" },
  { id: 2, name: "supplier 2" },
  { id: 3, name: "supplier 3" },
];

router.get('/api/suppliers/:id/edit', cors(), async (req, res) => {
  const supplier = suppliers.find(sup => sup.id == req.params.id) || {};
  res.json(supplier);
});

router.route('/api/suppliers/:id')
  .patch(cors(), async (req, res) => {
    res.json({});
  })
  .delete(cors(), async (req, res) => {
    res.json({});
  });

  router.route('/api/suppliers')
  .get(cors(), async (req, res) => {
    res.json(suppliers);
  })
  .post(cors(), async (req, res) => {
    res.json({});
  });

module.exports = router;