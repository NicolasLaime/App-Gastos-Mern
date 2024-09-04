const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      default: "SinCategoria",
    },
    type: {
      type: String,
      required: true,
      enum: ["ingreso", "gasto"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Categoria", categoriaSchema);