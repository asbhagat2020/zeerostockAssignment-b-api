import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: String,
  city: String,
});

export default mongoose.model("Supplier", supplierSchema);