const sequelize = require('../config/database')
const  DataTypes = require('sequelize');


const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    stock:{
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });
  
  module.exports = Product;
  