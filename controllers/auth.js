const User = require("../models/user");
const { generateToken } = require("../helpers");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { ApiResponse } = require("../helpers");
const sanitizeUser = require("../helpers/sanitizeUser");

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email, password })
    .then((user) => {
      if (!user) {
        return res.json(ApiResponse({}, "Invalid email or password", false));
      }
      if (!user.authenticate(password)) {
        return res.json(ApiResponse({}, "Invalid password!", false))
      }

      const token = generateToken(user)
      user.activeSession = token

      user.save((err, data) => {
        if (err) {
          return res.json(ApiResponse({}, err.message, false))
        }
        return res.json(ApiResponse({ user: sanitizeUser(data), token }));
      })

    })
    .catch((err) => {
      return res.json(
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
