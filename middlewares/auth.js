const jwt = require("jsonwebtoken");
const User = require("../models/user")
const { ApiResponse } = require("../helpers");
const { errorHandler } = require("../helpers/dbErrorHandler");
require("dotenv").config();

exports.authenticatedRoute = (req, res, next) => {

    //extracting bearer token
    const token =
        req.body.token || req.query.token || req.headers["authorization"];

    //responding with 403 if there is no token
    if (!token) {
        return res.status(403).json(ApiResponse({}, "Access Forbidden", false))
    }
    try {

        //verifying and decoding token
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

        //finding current user in db
        User.findById(decoded._id, (err, user) => {
            if (err) {
                return res.json(ApiResponse({}, errorHandler(err), false))
            }

            //responding with user not found error
            if (!user) {
                return res.json(ApiResponse({}, "User not found", false))
            }

            //matching active session of user
            if (user.activeSession != token.replace('Bearer ', '') && !user.isAdmin) {
                return res.status(401).json(ApiResponse({}, "Session expired, Please sign in again", false))
            }

            req.user = user;
            next()
        })
    } catch (err) {
        return res.status(401).send(ApiResponse({}, "Session expired, Please sign in again", false))
    }
    // return next();
};

exports.adminRoute = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {
        return res.status(403).json(ApiResponse({}, "Access Forbidden", false))
    }
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        if (!decoded.isAdmin) {
            return res.status(401).json(ApiResponse({}, "Unauthorized Access", false))
        }
        User.findById(decoded._id, (err, user) => {
            if (err) {
                return res.json(ApiResponse({}, errorHandler(err), false))
            }
            if (!user) {
                return res.json(ApiResponse({}, "User not found", false))
            }
            req.user = user;
            next()
        })
    } catch (err) {
        return res.status(401).send(ApiResponse({}, "Invalid Token, Please sign in again", false));
    }
}