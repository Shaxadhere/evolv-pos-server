const User = require("../models/user");
const Store = require("../models/store");
const { generateToken } = require("../helpers");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { ApiResponse } = require("../helpers");
const sanitizeUser = require("../helpers/sanitizeUser");

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json(ApiResponse({}, "Invalid email or password", false));
      }
      if (!user.authenticate(password)) {
        return res.status(401).json(ApiResponse({}, "Invalid password!", false))
      }

      const token = generateToken(user)

      if (!user.isAdmin) {
        Store.findById(user.store)
          .then((store) => {
            if (!store) {
              return res.status(401).json(ApiResponse({}, "Store not found", false));
            }
            return res.json(ApiResponse({ user: sanitizeUser({ ...user, store }), store, token }));
          })
      }
      else {
        return res.json(ApiResponse({ user: sanitizeUser(user), token }));
      }
    })
    .catch((err) => {
      return res.status(500).json(
        ApiResponse(
          {},
          errorHandler(err) ? errorHandler(err) : err.message,
          false
        )
      );
    });
};

exports.changePassword = (req, res) => {
  try {
    const { _id: id } = req.user
    const { currentPassword, newPassword } = req.body
    User.findById(id, (err, user) => {
      if (err) {
        return res.json(ApiResponse(
          {},
          errorHandler(err) ? errorHandler(err) : err.message,
          false
        ))
      }
      if (!user) {
        return res.json(ApiResponse(
          {},
          "User not found",
          false
        ))
      }
      if (!user.authenticate(currentPassword)) {
        return res.json(ApiResponse(
          {},
          "Invalid password",
          false
        ))
      }
      user.password = newPassword
      user.save((err, user) => {
        if (err) {
          return res.json(ApiResponse(
            {},
            errorHandler(err) ? errorHandler(err) : err.message,
            false
          ))
        }
        const sanitizedUser = sanitizeUser(user)
        return res.json(ApiResponse(
          { user: sanitizedUser },
          "Password updated successfully",
          true
        ))
      })
    })
  } catch (error) {
    return res.json(ApiResponse({}, error, false))
  }
}
