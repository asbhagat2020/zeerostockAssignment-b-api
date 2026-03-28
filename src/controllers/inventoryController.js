import Inventory from "../models/Inventory.js";
import Supplier from "../models/Supplier.js";

export const createInventory = async (req, res) => {
  try {
    const { supplier_id, product_name, quantity, price } = req.body;

    const supplier = await Supplier.findById(supplier_id);
    if (!supplier) {
      return res.status(400).json({ error: "Invalid supplier" });
    }

    if (quantity < 0) {
      return res.status(400).json({ error: "Quantity must be ≥ 0" });
    }

    if (price <= 0) {
      return res.status(400).json({ error: "Price must be > 0" });
    }

    const item = await Inventory.create({
      supplier_id,
      product_name,
      quantity,
      price,
    });

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


export const getInventory = async (req, res) => {
  try {
    const data = await Inventory.aggregate([
      {
        $lookup: {
          from: "suppliers",
          localField: "supplier_id",
          foreignField: "_id",
          as: "supplier",
        },
      },
      { $unwind: "$supplier" },
      {
        $group: {
          _id: "$supplier._id",
          supplierName: { $first: "$supplier.name" },
          totalValue: {
            $sum: { $multiply: ["$quantity", "$price"] },
          },
          items: {
            $push: {
              product_name: "$product_name",
              quantity: "$quantity",
              price: "$price",
            },
          },
        },
      },
      { $sort: { totalValue: -1 } },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};