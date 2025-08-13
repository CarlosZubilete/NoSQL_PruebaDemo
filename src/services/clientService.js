// !Functions are talking with Database and encapsulate the logic.
import Client from "../models/Client.js";

// export const listClient = async () => {
//   const [total, data] = await Promise.all([
//     Client.countDocuments({ deleted: false }),
//     Client.find({ deleted: false })
//       .select("-__v -createdAt -updatedAt -deleted")
//       .populate("clientType"),
//   ]);
//   return { total, data };
// };

export const listClient = async (order = {}) => {
  const [total, data] = await Promise.all([
    Client.countDocuments({ deleted: false }),
    Client.find({ deleted: false })
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

// export const deleteClient = async (payload) => {
//   console.log( 'Payload', payload);
// }
