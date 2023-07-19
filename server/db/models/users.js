const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Users = db.define('users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    validate: {
      isPhoneNumber(value) {
        const phoneRegex = /^\+1\s[0-9]{3}-[0-9]{3}-[0-9]{4}$/ // assuming all orders are from the US
        // we should add some autoformatting when a user inputs their phone so that it matches +1 xxx-xxx-xxxx
        if (!phoneRegex.test(value)) {
          throw new Error('Invalid phone number')
        }
      }
    }
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  password: {
    //pw & salt are boilerplate, leaving them in case we need them later
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  }
})

module.exports = Users

// below is all boilerplate

/**
 * instanceMethods
 */
Users.prototype.correctPassword = function(candidatePwd) {
  return Users.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
Users.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

Users.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = Users.generateSalt()
    user.password = Users.encryptPassword(user.password(), user.salt())
  }
}

Users.beforeCreate(setSaltAndPassword)
Users.beforeUpdate(setSaltAndPassword)
Users.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
