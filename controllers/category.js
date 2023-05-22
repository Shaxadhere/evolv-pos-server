const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { ApiResponse } = require("../helpers");

exports.list = (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        Category.aggregatePaginate(Category.aggregate([{
            $match: {
                store: req.user.store
            }
        }]), { page, limit }).then((categories) => {
            return res.json(ApiResponse(categories));
        })
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.categoryById = (req, res) => {
    try {
        Category.findById(req.params.id).then((category) => {
            if (!category) {
                return res.json(ApiResponse({}, "Category not found", false));
            }
            return res.json(ApiResponse(category));
        })
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.create = (req, res) => {
    try {
        req.body.store = req.user.store;
        const category = new Category(req.body);
        category.save().then((category) => {
            return res.json(ApiResponse(category, "Category created successfully", true));
        })
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.update = (req, res) => {
    try {
        Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true })
            .then((category) => {
                if (!category) {
                    return res.json(ApiResponse({}, "Category not found", false));
                }
                return res.json(ApiResponse(category, "Category updated successfully", true));
            }
            );
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.remove = (req, res) => {
    try {
        Category.findByIdAndRemove(req.params.id)
            .then((category) => {
                if (!category) {
                    return res.json(ApiResponse({}, "Category not found", false));
                }
                return res.json(ApiResponse(category, "Category deleted successfully", true));
            })
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}