// import dotenv from 'dotenv';
// import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import clientRoutes from './routes/clientRoutes.js'; 


const app = express();
app.use(express.json());
app.use(cors());

connectDB()
  .then(() => console.log('MongoDB connect'))
  .catch(err => console.error('Error MongoDB connect:', err));

app.use('/products', productRoutes);
app.use('/clients', clientRoutes);


export default app;
// console.log('Hola desde app.js')