const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { ApiResponse } = require("../helpers");

exports.list = (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        User.aggregatePaginate(User.aggregate([]), { page, limit }).then((users) => {
            return res.json(ApiResponse(users));
        })
    } catch (error) {
        return res.json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.userById = (req, res) => {
    try {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                return res.json(
                    ApiResponse(
                        {},
                        errorHandler(err) ? errorHandler(err) : err.message,
                        false
                    )
                );
            }
            if (!user) {
                return res.json(ApiResponse({}, "User not found", false));
            }
            return res.json(ApiResponse({ user }));
        })
    } catch (error) {
        return res.json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.create = (req, res) => {
    try {
        const user = new User(req.body);
        user.save((err, user) => {
            if (err) {
                return res.json(
                    ApiResponse(
                        {},
                        errorHandler(err) ? errorHandler(err) : err.message,
                        false
                    )
                );
            }
            return res.json(ApiResponse({ user }));
        })
    } catch (error) {
        return res.json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.update = (req, res) => {
    try {
        User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, user) => {
                if (err) {
                    return res.json(
                        ApiResponse(
                            {},
                            errorHandler(err) ? errorHandler(err) : err.message,
                            false
                        )
                    );
                }
                if (!user) {
                    return res.json(ApiResponse({}, "User not found", false));
                }
                return res.json(ApiResponse({ user }));
            }
        );
    } catch (error) {
        return res.json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.remove = (req, res) => {
    try {
        User.findByIdAndRemove(req.params.id, (err, user) => {
            if (err) {
                return res.json(
                    ApiResponse(
                        {},
                        errorHandler(err) ? errorHandler(err) : err.message,
                        false
                    )
                );
            }
            if (!user) {
                return res.json(ApiResponse({}, "User not found", false));
            }
            return res.json(ApiResponse({ user }));
        })
    } catch (error) {
        return res.json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}