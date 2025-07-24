import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: { 
    type : String , 
    required: true 
  },
  age: {
    type : Number,
    min : 0,  
    required: false,
    default: 1000, 
  },
  deleted:  { 
    type: Boolean, 
    default: false 
  }
  // date: {
  //   type : Date, 
  //   required: false,
  //   default: '01-02-2020' 
  // }
},{ timestamps:true });

export default mongoose.model('Client', clientSchema );