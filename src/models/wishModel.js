const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    productID: { type: mongoose.Schema.Types.ObjectId, required: ture },
    userID: { type: mongoose.Schema.Types.ObjectId, required: ture },
  },
  { timestamps: true, versionKey: false }
);

const wishModel = mongoose.model("wishes", dataSchema);

module.exports = wishModel;
