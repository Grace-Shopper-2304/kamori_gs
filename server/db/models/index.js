const Users = require('./users')
const Products = require('./products')
const Orders = require('./orders')
const OrderProducts = require('./orderProducts')

Users.hasMany(Orders)
Orders.belongsTo(Users)

Orders.hasMany(OrderProducts)
OrderProducts.belongsTo(Orders)

Products.hasMany(OrderProducts)
OrderProducts.belongsTo(Products)

module.exports = {
  Users,
  Products,
  Orders,
  OrderProducts
}
