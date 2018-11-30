"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Chai = require("chai");
const td = require("testdouble");
const supertest = require('supertest');
//importando aplicação
const api_1 = require("../../../server/api/api");
const app = api_1.default;
exports.app = app;
const request = supertest;
exports.request = request;
const expect = Chai.expect;
exports.expect = expect;
const testDouble = td;
exports.testDouble = testDouble;
