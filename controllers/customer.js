const Customer = require("../models/customer");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { ApiResponse } = require("../helpers");

exports.list = (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        Customer.aggregatePaginate(Customer.aggregate([]), { page, limit }).then((customers) => {
            return res.json(ApiResponse(customers));
        })
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.customerById = (req, res) => {
    try {
        Customer.findById(req.params.id).then((customer) => {
            if (!customer) {
                return res.json(ApiResponse({}, "Customer not found", false));
            }
            return res.json(ApiResponse(customer));
        })
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.create = (req, res) => {
    try {
        req.body.store = req.user.store;
        const customer = new Customer(req.body);
        customer.save().then((customer) => {
            return res.json(ApiResponse(customer, "Customer created successfully", true));
        })
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.update = (req, res) => {
    try {
        Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true })
            .then((customer) => {
                if (!customer) {
                    return res.json(ApiResponse({}, "Customer not found", false));
                }
                return res.json(ApiResponse(customer, "Customer updated successfully", true));
            }
            );
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.remove = (req, res) => {
    try {
        Customer.findByIdAndDelete(req.params.id).then((customer) => {
            if (!customer) {
                return res.json(ApiResponse({}, "Customer not found", false));
            }
            return res.json(ApiResponse(customer, "Customer deleted successfully", true));
        })
    } catch (error) {
        return res.status(500).json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

