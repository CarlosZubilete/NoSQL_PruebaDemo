// !Reciben req/res, llaman a servicios y formatean la respuesta:
import * as service from '../services/clientService.js';
import { getByIdClientType } from '../services/clientTypeService.js';

export const list = async (req, res) => {
  try {
    const result = await service.listClient();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error to get client' });
  }
};


export const getById = async (req,res) => {
  const{id} = req.params;
  try {
    const result = await service.getByIdClient(id);
    if (!result) return res.status(404).json({ success: false, message: 'Client not found'});
    res.json({ success: true, data: result });
  } catch (e) {
     res.status(400).json({ success: false, message: 'Invalid ID format' });
  }
};


export const create = async (req,res) => {
  if (req.body.clientType) {
    try {
      const tipo = await getByIdClientType(req.body.clientType);
      if (!tipo) return res.status(400).json({ success: false, message: 'Invalid clientType ID' });
    } catch (e) {
      return res.status(400).json({ success: false, message: 'Malformed clientType ID' });
    }
  }

  try {
    const result = await service.createClient(req.body);
    if (!result) return res.status(404).json({ success: false, message: 'Client not found' });
    res.status(201).json({ message: 'Client created' });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;

  if (req.body.clientType) {
    try {
      const tipo = await getByIdClientType(req.body.clientType);
      if (!tipo) return res.status(400).json({ success: false, message: 'Invalid clientType ID' });
    } catch (e) {
      return res.status(400).json({ success: false, message: 'Malformed clientType ID' });
    }
  }

  try {
    const result = await service.updateClient(id, req.body);
    if(!result) return res.status(404).json({ success: false , message: ' ID invalid' });
    res.json({ success: true, data: result });
  } catch (e) {
    res.status(400).json({ success: false, message: 'Error undating '});
  }
};

export const deleteByID = async (req,res) => {
  try {
    const result = await service.getByIdClient(req.params.id);
    if (!result) return res.status(404).json({ success: false, message: 'ID ivalid'});
    result.deleted = true;
    await service.updateClient(req.params.id, result);
    res.json({ success: true, message: 'Deleted success' }); 

  } catch (e) {
    res.status(400).json({ success: false, message: 'Invalid ID format' });
  }
};


