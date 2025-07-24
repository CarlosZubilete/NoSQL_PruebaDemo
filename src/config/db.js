import mongoose from 'mongoose';
import env from '../../env.js';

export function connectDB(){
  console.log('Conectando a MongoDB URI:', env.MONGO_URI);
  return mongoose.connect(env.MONGO_URI)
}

// import dotenv from 'dotenv';
// dotenv.config();

// export function connectDB(){
//   console.log('Conectando a MongoDB URI:', process.env.URI);
//   return mongoose.connect(process.env.URI)
// }
