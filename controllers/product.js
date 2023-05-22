const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { ApiResponse } = require("../helpers");
const { getProductListPipeline } = require("../pipelines/product");

exports.list = (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        Product.aggregatePaginate(Product.aggregate(getProductListPipeline(req)), { page, limit }).then((products) => {
            return res.json(ApiResponse(products));
        })
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.productById = (req, res) => {
    try {
        Product.findById(req.params.id).then((product) => {
            if (!product) {
                return res.json(ApiResponse({}, "Product not found", false));
            }
            return res.json(ApiResponse(product));
        })
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.create = (req, res) => {
    try {
        req.body.store = req.user.store;
        console.log(req.body)
        const product = new Product(req.body);
        product.save().then((product) => {
            return res.json(ApiResponse(product, "Product created successfully", true));
        })
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.update = (req, res) => {
    try {
        Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true })
            .then((product) => {
                if (!product) {
                    return res.json(ApiResponse({}, "Product not found", false));
                }
                return res.json(ApiResponse(product, "Product updated successfully", true));
            }
            );
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.remove = (req, res) => {
    try {
        Product.findByIdAndRemove(req.params.id).then((product) => {
            if (!product) {
                return res.json(ApiResponse({}, "Product not found", false));
            }
            return res.json(ApiResponse(product, "Product deleted successfully", true));
        })
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}