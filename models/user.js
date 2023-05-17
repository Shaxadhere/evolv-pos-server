const mongoose = require("mongoose");
const crypto = require("crypto");
const mongoosePaginate = require('mongoose-paginate');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const uuid = require("uuid").v1;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    displayPicture: {
      type: String,
    },
    salt: String,
    isAdmin:{
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuid();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      console.log(err.message);
      return "";
    }
  },
  authenticate: function (plainText) {
    console.log(plainText, "plainText");
    console.log(this.encryptPassword(plainText), "ENC");
    console.log(this.hashed_password, "HASH");
    return this.encryptPassword(plainText) === this.hashed_password;
  },
};

userSchema.plugin(mongoosePaginate);
userSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("user", userSchema);