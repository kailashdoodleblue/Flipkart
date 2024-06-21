const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const sequelize =require('./config/database')

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/user', userRoutes);


sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`User service running on port ${port}`);
  });
});
