import Supplier from "../models/Supplier.js";

export const createSupplier = async (req, res) => {
  const supplier = await Supplier.create(req.body);
  res.json(supplier);
};