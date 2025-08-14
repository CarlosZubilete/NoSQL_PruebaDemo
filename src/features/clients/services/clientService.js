// *Functions are talking with Database and encapsulate the logic.*
import Client from "../models/Client.js";

export const listClient = async (order = {}, age = {}) => {
  let queryFind = { deleted: false };
  if (age && Object.keys(age).length > 0) {
    queryFind = { ...queryFind, age };
  }
  // console.log("Query final:", queryFind);
  const [total, data] = await Promise.all([
    //Client.countDocuments({ deleted: false }),
    //Client.find({ deleted: false })
    Client.countDocuments(queryFind),
    Client.find(queryFind)
      .sort(order)
      .select("-__v -createdAt -updatedAt -deleted")
      .populate("clientType"),
  ]);
  return { total, data };
};

export const getByIdClient = async (id) => {
  return Client.findById(id)
    .select("-__v -createdAt -updatedAt -deleted")
    .populate("clientType");
};

export const createClient = async (payload) => {
  const doc = new Client(payload);
  return doc.save();
};

export const updateClient = async (id, payload) => {
  return Client.findByIdAndUpdate(id, payload, { new: true }).populate(
    "clientType"
  );
};

/* 

  let flag = false;

  if (Object.keys(age).length > 0) {
    const query = Object({
      value1: false,
      age: age,
    });

    console.log({ age }, ",", { deleted: true }); // esto es lo que quiero mandar hacia la consulta:
    console.log("Query = ", query);
    flag = true;
  }

*/
