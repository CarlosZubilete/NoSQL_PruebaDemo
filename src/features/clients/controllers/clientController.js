// !They receive requests, call services and format the response:
// todo: Also to do filters about idClientType...
import * as service from "../services/clientService.js";
import { getByIdClientType } from "../../clients-types/services/clientTypeService.js";
import { getOrderBy, getSelect } from "../utils/clientFilter.js";
import { clientFilterSchema } from "../validators/clientFilterSchema.js";

export const list = async (req, res) => {
  const { orderBy, ageMin, ageMax } = req.query;

  const { error, value } = clientFilterSchema.validate({
    orderBy: orderBy?.split(";").map((item) => item.split("=")[0]),
    min: ageMax,
    max: ageMax,
  });
  if (error) return res.status(400).json({ error: error.details[0].message });
  // console.log("values.orderBy ", value.orderBy);

  const selectAge = getSelect(ageMin, ageMax);
  const sortParams = getOrderBy(orderBy);

  try {
    const result = await service.listClient(sortParams, selectAge);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error to get client" });
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await service.getByIdClient(id);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    res.json({ success: true, data: result });
  } catch (e) {
    res.status(400).json({ success: false, message: "Invalid ID format" });
  }
};

export const create = async (req, res) => {
  // Verification client type...
  if (req.body.clientType) {
    try {
      const type = await getByIdClientType(req.body.clientType);
      if (!type)
        return res
          .status(400)
          .json({ success: false, message: "Invalid clientType ID" });
    } catch (e) {
      return res
        .status(400)
        .json({ success: false, message: "Malformed clientType ID" });
    }
  }

  try {
    const result = await service.createClient(req.body);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    res.status(201).json({ message: "Client created" });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;

  if (req.body.clientType) {
    try {
      const type = await getByIdClientType(req.body.clientType);
      if (!type)
        return res
          .status(400)
          .json({ success: false, message: "Invalid clientType ID" });
    } catch (e) {
      return res
        .status(400)
        .json({ success: false, message: "Malformed clientType ID" });
    }
  }

  try {
    const result = await service.updateClient(id, req.body);
    if (!result)
      return res.status(404).json({ success: false, message: " ID invalid" });
    res.json({ success: true, data: result });
  } catch (e) {
    res.status(400).json({ success: false, message: "Error updating " });
  }
};

export const deleteByID = async (req, res) => {
  try {
    const result = await service.getByIdClient(req.params.id);
    if (!result)
      return res.status(404).json({ success: false, message: "ID invalid" });
    result.deleted = true;
    await service.updateClient(req.params.id, result);
    res.json({ success: true, message: "Deleted success" });
  } catch (e) {
    res.status(400).json({ success: false, message: "Invalid ID format" });
  }
};

/*
const getOrder = (order) => {
  const split = order.split("="); // we have: 'order' , 'value'
  const sort = {};
  sort[split[0]] = Number(split[1]);
  return sort;
};
*/

/* 
export const list = async (req, res) => {
  const { orderBy } = req.query;
  const { ageMin } = req.query;
  const { ageMax } = req.query;

  const selectAge = getSelect(ageMin, ageMax);
  const sortParams = getOrderBy(orderBy);
  try {
    const result = await service.listClient(sortParams, selectAge);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error to get client" });
  }
};

*/
