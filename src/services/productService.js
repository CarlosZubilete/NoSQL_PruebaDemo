// !Fuctions are talking with Database and encapusulate the logic.
import Product from '../models/Product.js';


export const getAll = async () => {
  // const [ total , data ] = await Promise.all([
  //   Product.countDocuments(),
  //   Product.find({ deleted: false } ).select('-__v -createdAt -updatedAt -deleted')
  //   // Product.find()
  // ]);

  // return { total , data };

  return await Product.find({ deleted: false } ).select('-__v -createdAt -updatedAt -deleted')
};

/*
export const listProducts = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const [ total, data ] = await Promise.all([
    Product.countDocuments({ deleted: false }),
    Product.find({ deleted: false }).skip(skip).limit(limit)
  ]);
  return { total, page, limit, data };
};
*/

export const getProductById = async (id) => {
  return Product.findById(id).select('-__v -createdAt -updatedAt -deleted');
};


export const createProduct = async (payload) => {
  const prod = new Product(payload);
  return prod.save();
}


export const updateProduct = async (id, payload) => {
  return Product.findByIdAndUpdate(id, payload, { new: true });
}

export const deleteProduct = async (id,payload) => {
  // console.log('Services: ', payload);
  // console.log('Services_id: ', id);
  return Product.findByIdAndUpdate(id, payload, { new: true });
}


// Todo: Add delete physico but only administrador.
// Todo: Add query when get all doc (false and true) but only administrador.

// export const listProducts = async () => {
  
//   const [ total, data ] = await Promise.all([
//     Product.countDocuments(),
//     // Product.find()
//     Product.find({ price: { $gte: 0 } })
//     // Product.find({ price: { $gte: 0 } }).select('-__v') // *FILTER DIRECTELY FROM DATA BASE*
//   ]);

//   const dataUptdate = data.map((product) => {
//     const obj = product.toObject();
//     delete obj.__v;
//     return obj;
//   })
  
//   // console.log('dataUptdate ', dataUptdate);
//   // return { total, data };
//   return { total, dataUptdate };
// };



