import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 0,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    clientType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientType",
      default: () => new mongoose.Types.ObjectId("688cfc526831f0de98b2c87d"), // 'Client Common'
    },
  },
  { timestamps: true }
);

export default mongoose.model("Client", clientSchema);
