require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const shortner = require('./routes/shortner.routes');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.htdbz.gcp.mongodb.net/Shortner?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(shortner);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
