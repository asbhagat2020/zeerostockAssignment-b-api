import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
  product_name: String,
  quantity: {
    type: Number,
    min: 0,
  },
  price: {
    type: Number,
    min: 1,
  },
});

export default mongoose.model("Inventory", inventorySchema);