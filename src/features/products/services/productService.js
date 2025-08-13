// *Functions are talking with Database and encapsulate the logic.*
// Todo: Add delete physic but only user administrator.
// Todo: Add query when get all doc (false and true) but only user administrator.
import Product from "../models/Product.js";

export const getAll = async () => {
  const [total, data] = await Promise.all([
    Product.countDocuments({ deleted: false }),
    Product.find({ deleted: false }).select(
      "-__v -createdAt -updatedAt -deleted"
    ),
  ]);
  return { total, data };
};

export const getPagination = async ({ page = 1, limit = 6 }) => {
  const skip = (page - 1) * limit;
  const [total, data] = await Promise.all([
    Product.countDocuments({ deleted: false }),
    Product.find({ deleted: false })
      .select("-__v -createdAt -updatedAt -deleted")
      .skip(skip)
      .limit(limit),
  ]);
  return { total, page, limit, data };
};

export const getProductById = async (id) => {
  return Product.findById(id).select("-__v -createdAt -updatedAt -deleted");
};

export const createProduct = async (payload) => {
  const prod = new Product(payload);
  return prod.save();
};

export const updateProduct = async (id, payload) => {
  return Product.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteProduct = async (id, payload) => {
  return Product.findByIdAndUpdate(id, payload, { new: true });
};
