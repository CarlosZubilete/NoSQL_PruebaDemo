import ClientType from '../models/ClientType.js';

export const listClientType = async () => {
  const [total , data] = await Promise.all([
    ClientType.countDocuments(),
    ClientType.find().select('-__v -createdAt -updatedAt'),
  ])
  return { total, data };
}

export const getByIdClientType = async (id) => {
  return ClientType.findById(id).select('-__v -createdAt -updatedAt');
}

export const createClientType = async (payload) => {
  const doc = new ClientType(payload);
  return doc.save();
}

export const updateClientType = async ( id, payload ) => {
  return ClientType.findByIdAndUpdate( id, payload , { new : true });
} 
