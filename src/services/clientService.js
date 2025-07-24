// !Fuctions are talking with Database and encapusulate the logic.
import Client from '../models/Client.js';

export const listClient = async () => {
  
  const [ total, data ] = await Promise.all([
    Client.countDocuments(),
    Client.find({ deleted: false })
    //Client.find({ deleted: false }).select('-__v -createdAt -updatedAt -deleted') // *FILTER DIRECTELY FROM DATA BASE*
  ]);

  const dataUptdate = data.map((element) => {
    const obj = element.toObject();
    delete obj.deleted;
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
  });

  return { total, dataUptdate };
  // return { total, data };
};

export const createClient = async (payload) => {
  const doc = new Client(payload);
  return doc.save();
}

export const updateClient = async (id,payload) => {
  return Client.findByIdAndUpdate(id, payload, { new: true });
}

export const getByIdClient = async (id) => {
  return Client.findById(id);
}

// export const deleteClient = async (payload) => {
//   console.log( 'Payload', payload);
// }