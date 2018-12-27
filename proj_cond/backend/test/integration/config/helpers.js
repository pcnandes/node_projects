const mocha = require('mocha')
const Chai = require('chai')
const should = require('should')
const td = require('testdouble')

const supertest = require('supertest')

// iniciar servidor
require('dotenv-safe').config({
  allowEmptyValues: true
})
const App = require('../../../server/api')

// carrego os modelos e as configurações do banco
const db = require('./../../../server/models')

const initdb = function () {
  return db.sequelize.sync({ force: true })
}

const app = App
const request = supertest
const expect = Chai.expect
const testDouble = td

module.exports = { app, expect, request, testDouble, initdb }
