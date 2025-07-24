// !Reciben req/res, llaman a servicios y formatean la respuesta:
import * as service from '../services/clientService.js';

export const list = async (req, res) => {
  try {
    const result = await service.listClient();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error to get client' });
  }
};

export const create = async (req,res) => {
  try {
    const result = await service.createClient(req.body);

    // !THIS IS WRONG
    console.log('resutClient ',result);

    const resultUpdate = result.map((element) => {
      const obj = element.toObject();
      delete obj.deleted;
      delete obj.createdAt;
      delete obj.updatedAt;
      delete obj.__v;
      return obj;
    })

    console.log('Result Update ',resultUpdate);
    // res.status(201).json({ success: true, data: result }); 
    res.status(201).json({ success: true, data: resultUpdate }); 
  } catch (e) {
    res.status(400).json({ success: false, message: e.message});
  }
};

export const update = async (req, res) => {
  // const {id} = req.params 
  try {
    const result = await service.updateClient(req.params.id, req.body);
    if(!result) return res.status(404).json({ success: false , message: ' ID invalid' });
    res.json({ success: true, data: result });

  } catch (e) {
    res.status(400).json({ success: false, message: 'Error undating '});
  }

};

export const getById = async (req,res) => {
  try {
    const result = await service.getByIdClient(req.params.id);
    if (!result) return res.status(404).json({ success: false, message: 'ID ivalid'});

    console.log('resutClient ',result);
    
    const filterResult = {
      id: result._id,
      name: result.name,
      age:result.age
    } 

    console.log('Result Update ',filterResult);
  

    res.json({ success: true, data: filterResult });

  } catch (e) {
     res.status(400).json({ success: false, message: 'Invalid ID format' });
  }
};

export const deleteByID = async (req,res) => {
  try{
    const result = await service.getByIdClient(req.params.id);
    if (!result) return res.status(404).json({ success: false, message: 'ID ivalid'});
    // res.json({ success: true, data: result });
    // console.log('Result: ' , result);
    // console.log('Result: ' , result.deleted);
    result.deleted = true ;

    console.log('Result deleted?: ' , result.deleted);
    // const update = await service.updateClient(req.params.id, result);
    await service.updateClient(req.params.id, result);
    res.json({ success: true, message: 'Deleted success' }); 

  } catch (e) {
    res.status(400).json({ success: false, message: 'Invalid ID format' });
  }
};


