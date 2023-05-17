const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { ApiResponse } = require("../helpers");

exports.list = (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        Category.aggregatePaginate(Category.aggregate([]), { page, limit }).then((categories) => {
            return res.json(ApiResponse(categories));
        })
    } catch (error) {
        return res.json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.categoryById = (req, res) => {
    try {
        Category.findById(req.params.id, (err, category) => {
            if (err) {
                return res.json(
                    ApiResponse(
                        {},
                        errorHandler(err) ? errorHandler(err) : err.message,
                        false
                    )
                );
            }
            if (!category) {
                return res.json(ApiResponse({}, "Category not found", false));
            }
            return res.json(ApiResponse({ category }));
        })
    } catch (error) {
        return res.json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.create = (req, res) => {
    try {
        const category = new Category(req.body);
        category.save((err, category) => {
            if (err) {
                return res.json(
                    ApiResponse(
                        {},
                        errorHandler(err) ? errorHandler(err) : err.message,
                        false
                    )
                );
            }
            return res.json(ApiResponse({ category }));
        })
    } catch (error) {
        return res.json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.update = (req, res) => {
    try {
        Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, category) => {
                if (err) {
                    return res.json(
                        ApiResponse(
                            {},
                            errorHandler(err) ? errorHandler(err) : err.message,
                            false
                        )
                    );
                }
                if (!category) {
                    return res.json(ApiResponse({}, "Category not found", false));
                }
                return res.json(ApiResponse({ category }));
            }
        );
    } catch (error) {
        return res.json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.remove = (req, res) => {
    try {
        Category.findByIdAndRemove(req.params.id, (err, category) => {
            if (err) {
                return res.json(
                    ApiResponse(
                        {},
                        errorHandler(err) ? errorHandler(err) : err.message,
                        false
                    )
                );
            }
            if (!category) {
                return res.json(ApiResponse({}, "Category not found", false));
            }
            return res.json(ApiResponse({ category }));
        })
    } catch (error) {
        return res.json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}