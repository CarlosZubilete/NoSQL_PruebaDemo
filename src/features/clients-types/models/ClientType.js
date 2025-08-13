import mongoose from "mongoose";

const clientTypeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      require: true,
      unique: true,
    },
    discount: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ClientType", clientTypeSchema);
