'use strict'

const db = require('../server/db')
const {Users, Products, Orders, OrderProducts} = require('../server/db/models')

const users = [
  {
    email: 'cody@email.com',
    name: 'Cody Ydoc',
    address: '1234 Street New York, NY 10024',
    phone: '+1 123-456-7890',
    admin: 'false',
    password: '123'
  }
]

const orders = [{completed: false}]

const products = [
  {
    name: 'Solovair boots',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/4/4b/Racing_Green_8_eye_Derby_Boot.jpg',
    description: 'color: green. size: 8.5 women',
    category: 'shoes',
    price: '50.99',
    stock: '2'
  }
]

const orderProducts = [{quantity: '1', price: '50.99', productId: 1}]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(
    users.map(user => {
      return Users.create(user)
    })
  )

  await Promise.all(
    orders.map(order => {
      return Orders.create(order)
    })
  )

  await Promise.all(
    products.map(product => {
      return Products.create(product)
    })
  )

  await Promise.all(
    orderProducts.map(oProduct => {
      return OrderProducts.create(oProduct)
    })
  )

  console.log(`seeded ${users.length} users. Woof~`)
  console.log(`seeded ${orders.length} orders. Woof~`)
  console.log(`seeded ${products.length} products. Woof~`)
  console.log(`seeded ${orderProducts.length} order products. Woof~`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
