const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
const Order = require('./models/order');
const sequelize= require('./config/database')

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use('/order', orderRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Order service running on port ${port}`);
  });
});
 