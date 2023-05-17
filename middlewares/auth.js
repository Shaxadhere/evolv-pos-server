const jwt = require("jsonwebtoken");
const User = require("../models/user")
const { ApiResponse } = require("../helpers");
const { errorHandler } = require("../helpers/dbErrorHandler");
require("dotenv").config();

exports.authenticatedRoute = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {
        return res.status(401).json(ApiResponse({}, "Access Forbidden", false))
    }
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

        User.findById(decoded._id)
            .then((user) => {
                if (!user) {
                    return res.json(ApiResponse({}, "User not found", false))
                }
                req.user = user;
                next()
            })
            .catch((err) => {
                return res.json(ApiResponse({}, errorHandler(err), false))
            })
    } catch (err) {
        console.log(err)
        return res.status(401).send(ApiResponse({}, "Session expired, Please sign in again", false))
    }
    // return next();
};

exports.adminRoute = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {
        return res.status(401).json(ApiResponse({}, "Access Forbidden", false))
    }
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        if (!decoded.isAdmin) {
            return res.status(401).json(ApiResponse({}, "Unauthorized Access", false))
        }
        User.findById(decoded._id)
            .then((user) => {
                if (!user) {
                    return res.json(ApiResponse({}, "User not found", false))
                }
                req.user = user;
                next()
            })
            .catch((err) => {
                return res.json(ApiResponse({}, errorHandler(err), false))
            })
    } catch (err) {
        return res.status(401).send(ApiResponse({}, "Invalid Token, Please sign in again", false));
    }
}