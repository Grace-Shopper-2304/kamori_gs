const Users = require('./users')
const Products = require('./products')
const Orders = require('./orders')

/* I don't want to define associations just yet

 Users.hasMany(Products);
Products.belongsTo(Users); */

module.exports = {
  Users,
  Products,
  Orders
}
