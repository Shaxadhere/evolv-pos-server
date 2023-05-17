const Sale = require("../models/sale");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { ApiResponse } = require("../helpers");

exports.list = (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        Sale.aggregatePaginate(Sale.aggregate([]), { page, limit }).then((sales) => {
            return res.json(ApiResponse(sales));
        })
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.saleById = (req, res) => {
    try {
        Sale.findById(req.params.id).then((sale) => {
            if (!sale) {
                return res.status(404).json(ApiResponse({}, "Sale not found", false));
            }
            return res.json(ApiResponse(sale));
        })
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.create = (req, res) => {
    try {
        const sale = new Sale(req.body);
        sale.save().then((sale) => {
            return res.json(ApiResponse(sale));
        })
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.update = (req, res) => {
    try {
        Sale.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true })
            .then((sale) => {
                if (!sale) {
                    return res.status(404).json(ApiResponse({}, "Sale not found", false));
                }
                return res.json(ApiResponse(sale));
            }
            );
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.remove = (req, res) => {
    try {
        Sale.findByIdAndRemove(req.params.id).then((sale) => {
            if (!sale) {
                return res.status(404).json(ApiResponse({}, "Sale not found", false));
            }
            return res.json(ApiResponse(sale));
        })
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}