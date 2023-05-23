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
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.listStoreUsers  = (req, res) => {
    try {
        User.find({store: req.user.store}).then((users) => {
            return res.json(ApiResponse(users));
        })
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.userById = (req, res) => {
    try {
        User.findById(req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(404).json(ApiResponse({}, "User not found", false));
                }
                return res.json(ApiResponse(user));
            })
            .catch((err) => {
                return res.status(500).json(
                    ApiResponse(
                        {},
                        errorHandler(err) ? errorHandler(err) : err.message,
                        false
                    )
                );
            })
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.create = (req, res) => {
    try {
        User.findOne({ email: req.body.email }).then((user) => {
            if (user) {
                return res.status(402).json(ApiResponse({}, "Email already exists", false));
            }
            const _user = new User(req.body);
            _user.save()
                .then((_user) => {
                    return res.json(ApiResponse(_user, "User created successfully", true));
                })
                .catch((err) => {
                    return res.status(500).json(
                        ApiResponse(
                            {},
                            errorHandler(err) ? errorHandler(err) : err.message || err || "Unknown Error",
                            false
                        )
                    );
                })
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.update = (req, res) => {
    try {
        User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true })
            .then((user) => {
                if (!user) {
                    return res.status(404).json(ApiResponse({}, "User not found", false));
                }
                return res.json(ApiResponse(user, "User updated successfully", true));
            })
            .catch((err) => {
                return res.status(500).json(
                    ApiResponse(
                        {},
                        errorHandler(err) ? errorHandler(err) : err.message,
                        false
                    )
                );
            })
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.remove = (req, res) => {
    try {
        User.findByIdAndRemove(req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(404).json(ApiResponse({}, "User not found", false));
                }
                return res.json(ApiResponse(user, "User deleted successfully", true));
            })
            .catch((err) => {
                return res.status(500).json(
                    ApiResponse(
                        {},
                        errorHandler(err) ? errorHandler(err) : err.message,
                        false
                    )
                );
            })
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}