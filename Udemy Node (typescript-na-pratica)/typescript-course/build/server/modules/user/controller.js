"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPStatus = require("http-status");
class UserController {
    constructor() { }
    getAll(req, res) {
        res.status(HTTPStatus.OK).json({
            message: 'OK'
        });
    }
    createUser(req, res) {
        res.status(HTTPStatus.OK).json({
            message: 'OK'
        });
    }
    getById(req, res) {
        res.status(HTTPStatus.OK).json({
            message: 'OK'
        });
    }
    updateUser(req, res) {
        res.status(HTTPStatus.OK).json({
            message: 'OK'
        });
    }
    deleteUser(req, res) {
        res.status(HTTPStatus.OK).json({
            message: 'OK'
        });
    }
}
exports.default = UserController;
