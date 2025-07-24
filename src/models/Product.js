import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { 
    type : String , 
    required: true 
  },
  price: {
    type : Number,
    min : 0,  
    required: true 
  },
  category: {
    type : String, 
    required: false,
    default: '' 
  },
  deleted:  { 
    type: Boolean, 
    default: false 
  }
},{ timestamps:true });

export default mongoose.model('product', productSchema );

/**
 *   deleted:  { 
    type: Boolean, 
    default: false 
  }
  // date: {
  //   type : Date, 
  //   required: false,
  //   default: '01-02-2020' 
  // }
},{ timestamps:true });
 */