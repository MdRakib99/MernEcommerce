const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    brandName: { type: String, unique: true },
    brandImage: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const brandModel = mongoose.model("brands", dataSchema);

module.exports = brandModel;
