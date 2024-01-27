const mongoose = require("mongoose");
const dataSchema = mongoose.Schema(
  {
    type: { type: String, unique: true, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);
const legalModel = mongoose.model("legals", dataSchema);
module.exports = legalModel;
