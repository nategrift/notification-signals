require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const port = process.env.PORT || 3000;

const app = express();

// Parse the body for incoming post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())
app.use(helmet())

app.use(require('./routes'))

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});