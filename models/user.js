const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, min: 3, max: 100 },
    surname: { type: String, required: true, min: 3, max: 100 },
    email: { type: String, required: true },
    password: { type: String, required: true },
    membership: { type: Boolean, required: true },
    isadmin: { type: Boolean, required: true },
  },
  { timestamps: true }
);

UserSchema.virtual("fullname").get(function () {
  return `${this.name} ${this.surname}`;
});

UserSchema.virtual("url").get(function () {
  return `/user/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
