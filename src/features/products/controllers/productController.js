import * as service from "../services/productService.js";

export const getProducts = async (req, res) => {
  try {
    const { page } = req.query;
    if (page) {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 6;
      const result = await service.getPagination({ page, limit });
      return res.json({
        success: true,
        total: result.total,
        page,
        limit,
        data: result.data,
      });
    }
    const result = await service.getAll();
    return res.json({
      success: true,
      total: result.total,
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({ error: "Error to get products" });
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await service.getProductById(id);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "Product no found" });
    res.json({ success: true, data: result });
  } catch (e) {
    res.status(400).json({ success: false, message: "Invalid ID" });
  }
};

export const create = async (req, res) => {
  try {
    const result = await service.createProduct(req.body);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "Product no found" });
    res.status(201).json({ message: "Product created" });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await service.updateProduct(id, req.body);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "Product no found" });
    res.json({ success: true, message: "Product updated" });
  } catch (e) {
    res.status(400).json({ success: false, message: "Error undating product" });
  }
};

export const deleteByID = async (req, res) => {
  const { id } = req.params;
  try {
    let result = await service.getProductById(id); // retorn a object.
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "Product no found" });
    result.deleted = true;
    await service.deleteProduct(id, result);
    res.json({ success: true, message: "Product deleted" });
  } catch (e) {
    res.status(400).json({ success: false, message: "Error deleting product" });
  }
};
