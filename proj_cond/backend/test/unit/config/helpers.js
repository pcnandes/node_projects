import App from '../../../app'
import * as mocha from 'mocha'
import * as Chai from 'chai'
// import * as td from 'testdouble'
// const supertest = require('supertest')

const app = App
const should = require('should')
// const request = supertest
const request = require('request')
const expect = Chai.expect
// const testDouble = td

// export { app, expect, request, testDouble, mocha }
export { app, should, expect, request, mocha }
