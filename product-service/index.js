const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const sequelize = require('./config/database')

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use('/product', productRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Product service running on port ${port}`);
  });
});
