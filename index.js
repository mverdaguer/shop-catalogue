const express = require('express')
const cors = require('cors')
const path = require('path')

// Create the server
const app = express()

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/dist')))
app.use(express.static(path.join(__dirname, 'client/public_images')))

app.get('/api/categories', cors(), async (req, res) => {
  const categories = [
    {id: 1, name: "carbohydrates", parent_category: null},
    {id: 2, name: "vegetables", parent_category: null},
    {id: 3, name: "fruit", parent_category: null},
    {id: 6, name: "grains", parent_category: 1},
    {id: 7, name: "legumes", parent_category: 1},
    {id: 8, name: "beans", parent_category: 7}
  ];

  res.json(categories);
});

app.get('/api/home_images', cors(), async (req, res) => {
  const homeImages = ["lemon.jpg", "coffee.jpg", "sushi.jpg", "vegetables.jpg"];

  res.json(homeImages);
});

app.get('/api/items', cors(), async (req, res) => {
  const items = [
    { id: 1, name: "lentils", image: ".jpg", category: { id: 7 }, supplier: {} },
    { id: 2, name: "chickpeas", image: ".jpg", category: { id: 7 }, supplier: {} },
    { id: 3, name: "peas", image: ".jpg", category: { id: 7 }, supplier: {} },
    { id: 4, name: "kidney beans", image: ".jpg", category: { id: 8 }, supplier: {} },
    { id: 5, name: "black beans", image: ".jpg", category: { id: 8 }, supplier: {} },
    { id: 6, name: "soybeans", image: ".jpg", category: { id: 8 }, supplier: {} },
    { id: 7, name: "pinto beans", image: ".jpg", category: { id: 8 }, supplier: {} },
    { id: 8, name: "navy beans", image: ".jpg", category: { id: 8 }, supplier: {} },
    { id: 9, name: "peanuts", image: ".jpg", category: { id: 7 }, supplier: {} },
    { id: 10, name: "brown rice", image: ".jpg", category: { id: 6 }, supplier: {} },
    { id: 11, name: "freekeh", image: ".jpg", category: { id: 6 }, supplier: {} },
    { id: 12, name: "grapefruit", image: ".jpg", category: { id: 3 }, supplier: {} },
    { id: 13, name: "strawberry", image: ".jpg", category: { id: 3 }, supplier: {} },
    { id: 14, name: "watermelon", image: ".jpg", category: { id: 3 }, supplier: {} },
    { id: 15, name: "papaya", image: ".jpg", category: { id: 3 }, supplier: {} },
    { id: 16, name: "carrot", image: ".jpg", category: { id: 2 }, supplier: {} },
    { id: 17, name: "broccoli", image: ".jpg", category: { id: 2 }, supplier: {} },
    { id: 18, name: "asparagus", image: ".jpg", category: { id: 2 }, supplier: {} },
  ];

  res.json(items);
});

const suppliers = [
  {id: 1, name: "supplier 1" },
  {id: 2, name: "supplier 2" },
  {id: 3, name: "supplier 3" },
];

app.route('/api/suppliers')
  .get(cors(), async (req, res) => {
    res.json(suppliers);
  })
  .delete(cors(), async (req, res) => {
    res.json({});
  })
  .post(cors(), async (req, res) => {
    res.json({});
  })
  .put(cors(), async (req, res) => {
    res.json({});
  });

app.get('/api/suppliers/:id/edit', cors(), async (req, res) => {
  const supplier = suppliers.find(sup => sup.id === req.params.id) || {id: req.params};
});


/*app.get('/api/suppliers', cors(), async (req, res) => {
  const suppliers = [
    {id: 1, name: "supplier 1" },
    {id: 2, name: "supplier 2" },
    {id: 3, name: "supplier 3" },
  ];

  res.json(suppliers);
});*/

app.post('/api/send', cors(), async (req, res) => {
  res.json({});
});

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'))
})

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})
