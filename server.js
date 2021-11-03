const path = require("path")
const parser = require('body-parser');
const express = require("express"); // npm installed
const cors = require('cors');

const { getProducts, getProduct, getProductStyles, getRelatedProducts, getReviews, getReviewMetaData, postReview, markReview, reportReview, getQuestions, getAnswers, postQuestion } = require('./helper.js');

const app = express();

app.use(cors());
app.use(parser.urlencoded({ extended: true }))
app.use(parser.json());
app.use(express.static(path.join(__dirname, "/client/dist")));
// other configuration...

// Get Products
app.get('/api/products', async (req, res) => {
  var data = await getProducts();
  res.send(data);
});

// Get Single Product
app.get('/api/products/:product_id', async (req, res) => {
  var data = await getProduct(req.params.product_id);
  res.send(data);
});

// Get Product Styles
app.get('/api/products/:product_id/styles', async (req, res) => {
  var data = await getProductStyles(req.params.product_id);
  res.send(data);
})

// Get Related Products
app.get('/api/products/:product_id/related', async (req, res) => {
  var data = await getRelatedProducts(req.params.product_id);
  res.send(data);
})

// Get Reviews
app.get('/api/reviews/:product_id', async (req, res) => {
  var data = await getReviews(req.params.product_id);
  res.send(data);
})

// Get Review metadata
app.get('/api/reviews/meta/:product_id', async (req, res) => {
  var data = await getReviewMetaData(req.params.product_id);
  res.send(data);
})

// Post Review
app.post('/api/reviews/:product_id', async (req, res) => {
  // console.log(req.body);
  var data = await postReview(req.params.product_id, req.body);
  res.send(data);
});

// Mark Review as Helpful
app.put('/api/reviews/helpful/', async (req, res) => {

  var data = await markReview(req.query.review_id);
  res.send(data);
});

// Report Review
app.put('/api/reviews/report/', async (req, res) => {
  var data = await reportReview(req.query.review_id);
  res.send(data);
})

// Get questions for product
app.get('/api/qa/questions/:product_id', async (req, res) => {
  var data = await getQuestions(req.params.product_id);
  res.send(data);
})

// Get answers for question
app.get('/api/qa/questions/answers/:question_id', async (req, res) => {
  var data = await getAnswers(req.params.question_id);
  res.send(data)
})

// Post question
app.post('/api/qa/questions/:product_id', async (req, res) => {
  var data = await postQuestion(req.params.product_id, req.body);
  res.send(data);
})

var yourOutfit = {
  'xinyi': [40353, 40352]
};

// Post product to Outfit List
app.post('/outfit/:username', (req, res) => {
  const username = req.params.username;
  const outfitId = req.body.id;
  if (yourOutfit[username] === undefined) {
    yourOutfit[username] = [];
  }
  if (!yourOutfit[username].includes(outfitId)) {
    yourOutfit[username].push(outfitId);
  }
  res.sendStatus(201);
});

// get Outfit List
app.get('/outfit/:username', (req, res) => {
  const username = req.params.username;
  if (yourOutfit[username] === undefined) {
    yourOutfit[username] = [];
  }
  res.send(yourOutfit[username]);
});

let cartObj = [];

// Add to cart
app.get('/api/cart', (req, res) => {
  res.status(200).send(cartObj);
});

app.post('/api/cart', (req, res) => {
  console.log(req.body);
  cartObj.push(req.body);
  res.sendStatus(201);
});
// delete from outfit List
app.delete('/outfit/:username', (req, res) => {
  const username = req.params.username;
  const outfitId = req.body.id;
  if (yourOutfit[username] === undefined) {
    res.sendStatus(202);
    return;
  }
  const index = yourOutfit[username].indexOf(outfitId);
  if (index === -1) {
    res.sendStatus(202);
    return;
  }
  yourOutfit[username].splice(index, 1);
  res.sendStatus(202);
}
);

app.listen(3000, () => {
  console.log(`app listening on port 3000`)
});