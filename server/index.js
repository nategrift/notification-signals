require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())
app.use(helmet())

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const tokensMiddleware = require('./middleware/token.js');
const apiRoutes = require('./routes/api');
app.use('/api', tokensMiddleware.checkToken, apiRoutes);

const publicRoutes = require('./routes/public');
app.use('/', publicRoutes);

const errorController = require('./controllers/errorController');
app.use(errorController.catchErrors);


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});