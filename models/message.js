const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MensagemSchema = new Schema(
  {
    title: { type: String, required: true, min: 3, max: 100 },
    text: { type: String, required: true, min: 3, max: 500 },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

MensagemSchema.virtual("url").get(function () {
  return `/mensagem/${this._id}`;
});

module.exports = mongoose.model("Mensagem", MensagemSchema);
