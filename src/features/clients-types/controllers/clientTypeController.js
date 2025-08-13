import * as service from "../services/clientTypeService.js";

export const list = async (req, res) => {
  try {
    const result = await service.listClientType();
    res.status(200).json({ success: true, data: result });
  } catch (e) {
    res
      .status(500)
      .json({ message: `Error to get list of clientType  ${e.message}` });
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await service.getByIdClientType(id);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "ClientType no found" });
    res.json({ success: true, data: result });
  } catch (e) {
    res.status(400).json({ success: false, message: "Invalid ID" });
  }
};

export const create = async (req, res) => {
  try {
    const result = await service.createClientType(req.body);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "ClientType no found" });
    res.status(201).json({ message: "ClientType created" });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await service.updateClientType(id, req.body);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "ClientType no found" });
    res.json({ success: true, message: "ClientType updated" });
  } catch (e) {
    res
      .status(400)
      .json({ success: false, message: "Error undating ClientType" });
  }
};

// THERE ARE NOT VERB DELETE...
