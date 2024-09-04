const mongoose = require("mongoose");

const TransaccionesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["ingreso", "gasto"],
    },
    categoria: {
      type: String,
      required: true,
      default: "SinCategoria",
    },
    monto: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    descripcion: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaccion", TransaccionesSchema);