// !Reciben req/res, llaman a servicios y formatean la respuesta:

import * as service from '../services/productService.js';

export const list = async (req, res) => {
  // const result = await service.listProducts();
  // res.json({ success: true, ...result });
  try {
    const result = await service.getAll();
    res.json(result);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: 'Error to get products' });
  }
};

/* 
  export const list = async (req, res) => {
    const { page, limit } = req.query;
    const result = await service.listProducts({ page, limit });
    res.json({ success: true, ...result });
  };
*/


export const getById = async (req,res) => {
  
  const{id} = req.params;

  try {
    const result = await service.getProductById(id); 

    if(!result) return res.status(404).json({ success: false, message: 'Product no found'});
    // res.json({ data: result })
    res.json({ success: true , data: result })
  } catch (e) {
    res.status(400).json({ success: false, message: 'Invalid ID' })
  }

};


export const create = async (req,res) => {
  try {
    const result = await service.createProduct(req.body);
    res.status(201).json({ message: 'Product created'});
    // res.status(201).json({ success: true, message: 'Product created'}); 
    // res.status(201).json({ success: true, data: result }); 
  } catch (e) {
    res.status(400).json({ success: false, message: e.message});
  }
};

export const update = async (req, res) => {
  
  const {id} = req.params;
  // There's not validation:
  try {
    const result = await service.updateProduct(id, req.body);
    
    if(!result) return res.status(404).json({ success: false, message: 'Product no found'});

    // res.json({ success: true, data: result });
    res.json({ success: true, message: 'Product updated'});
  } catch (e) {
    res.status(400).json({ success: false, message: 'Error undating product'});
  }
};

export const deleteByID = async (req,res) => {
  const {id} = req.params; 
  try{
    let result = await service.getProductById(id); // retorn a object.
    if (!result)  return res.status(404).json({ success: false, message: 'Product no found'});   
    result.deleted = true;
    // console.log('I am here' ,result);
    await service.deleteProduct(id, result);
    res.json({ success: true, message: 'Product deleted' });
  } catch (e) {
      res.status(400).json({ success: false, message: 'Error deleting product'});
  }
}



// *pagination*

/**
const { page = 1, limit = 10 } = req.query;
const skip = (page - 1) * limit;

const [total, data] = await Promise.all([
  ProductModel.countDocuments({ deleted: false }),
  ProductModel.find({ deleted: false })
    .skip(skip)
    .limit(Number(limit))
]);

res.json({ total, page: Number(page), limit: Number(limit), data });

*/