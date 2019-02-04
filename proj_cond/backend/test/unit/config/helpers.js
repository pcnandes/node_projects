const mocha = require('mocha')
const Chai = require('chai')
const should = require('should')

const request = require('request')
const expect = Chai.expect

const db = require('./../../../server/models')

const initdb = function () {
  return db.sequelize.sync({ force: true })
}

module.exports = { should, expect, request, mocha, initdb, db }
