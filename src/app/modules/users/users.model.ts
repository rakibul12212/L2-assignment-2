import { Schema,model } from "mongoose";
import { Address, FullName, Order, User } from "./users.inteface";


const fullNameSchema = new Schema<FullName>(
    {
      firstName: {
        type: String,
        required:[ true,'first name is requred'],
        trim:true,
        
      },
      lastName: {
        type: String,
        required: [true,"last name is required"],
        trim:true,
      },
    },
  );
  
  const addressSchema = new Schema<Address>(
    {
      street: {
        type: String,
        required: [true, 'street name is required'],
        trim:true,
      },
      city: {
        type: String,
        required: [true, 'city name is required'],
        trim:true,
      },
      country: {
        type: String,
        required:[ true,'country  is required'],
        trim:true,
      },
    }
  );
  
  const orderSchema = new Schema<Order>(
    {
      productName: {
        type: String,
        required: [true, 'product name is required'],
        trim:true,
      },
      price: {
        type: Number,min: 0,
        required: [true, 'price is required'],
        trim:true,
      },
      quantity: {
        type: Number,
        min: [0,'min quantity 1'] ,
        required:[ true,' quantity is required' ],
        trim:true,
      },
    }
   
  );
  
  const userSchema = new Schema<User>({
    userId: {
      type: Number,unique: true,
      required: [true, "userId is required"],
      trim:true,
    },
    username: {
      type: String,
      required:[ true,'username is required'],
      trim:true,
    },
    password: {
      type: String,
      required: [true,"password is required"],
      trim:true,
    },
    fullName: {
      type: fullNameSchema,
      required: [true, 'fullname is required'],
      trim:true,
    },
    age: {
      type: Number,
      required:  [true, 'age is required'],
      trim:true,
      min: [1,'min age 1'], 
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      trim:true,
    },
    isActive: {
      type: Boolean,
      required: true,
      trim:true,
      default: true,
    },
    hobbies: [
      {
        type: String,
        required: [true, 'hobbies is required'],
        trim:true,
      },
    ],
    address: {
      type: addressSchema,
      required: [true, 'address is required'], 
      trim:true,
    },
    orders: [
      {
        type: orderSchema,
      },
    ],
    isDeleted: {
      type: Boolean,default: false,
    },
  });
  

 export const UserModel =model<User>('User',userSchema)