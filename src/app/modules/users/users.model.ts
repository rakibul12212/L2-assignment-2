import { Schema,model,connect } from "mongoose";
import { Address, FullName, Order, User } from "./users.inteface";

const fullNameSchema = new Schema<FullName>(
    {
      firstName: {
        type: String,required: true,
      },
      lastName: {
        type: String,required: true,
      },
    },
  );
  
  const addressSchema = new Schema<Address>(
    {
      street: {
        type: String,required: true,
      },
      city: {
        type: String,required: true,
      },
      country: {
        type: String,required: true,
      },
    }
  );
  
  const orderSchema = new Schema<Order>(
    {
      productName: {
        type: String,required: true,
      },
      price: {
        type: Number,min: 0, required: true,
      },
      quantity: {
        type: Number,min: 0, required: true, 
      },
    }
   
  );
  
  const userSchema = new Schema<User>({
    userId: {
      type: Number,unique: true,required: true,
    },
    username: {
      type: String,required: true,
    },
    password: {
      type: String,required: true,
    },
    fullName: {
      type: fullNameSchema,required: true,
    },
    age: {
      type: Number,
      required: true,min: 1, 
    },
    email: {
      type: String,required: true,
    },
    isActive: {
      type: Boolean,required: true,default: true,
    },
    hobbies: [
      {
        type: String,required: true,
      },
    ],
    address: {
      type: addressSchema,required: true, 
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