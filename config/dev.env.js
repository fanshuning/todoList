'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
let HOST = process.argv.splice
console.log(HOST)
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
