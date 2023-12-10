import { Schema, model, connect } from 'mongoose';
import { Address, FullName, Order, User, UserModel } from './users/users.inteface';

const fullNameSchema = new Schema<FullName>(
    {
      firstName: {
        type: String,
        required: [true, "first name is required"],
      },
      lastName: {
        type: String,
        required: [true, "last name is required"],
      },
    },
  );

  const addressSchema = new Schema<Address>(
    {
      street: {
        type: String,
        required: [true, "street is required"],
      },
      city: {
        type: String,
        required: [true, "city is required"],
      },
      country: {
        type: String,
        required: [true, "country is required"],
      },
    },
  );
  
  const orderSchema = new Schema<Order>(
    {
      productName: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        min: [0, "price > 0"],
        required: [true, "price is required"],
      },
      quantity: {
        type: Number,
        min: [0, "quantity > 0"],
        required: [true, "quantity is required"],
      },
    },
  );
const userSchema = new Schema<User,UserModel>({
    userId: {
      type: Number,
      required: [true, "userId is required"],
    },
    username: {
      type: String,
      required: [true, "username is required"],
    },
    password: {
      type: String,
      required: [true, "password is required "],
    },
    fullName: {
      type: fullNameSchema,
      required: [true, "fullName is required"],
    },
    age: {
      type: Number,
      required: [true, "age is required"],
      min: [1, "Age > 1"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    isActive: {
      type: Boolean,
      required: [true, "isActive is required"],
      default: true,
    },
    hobbies: [
      {
        type: String,
        required: true,
      },
    ],
    address: {
      type: addressSchema,
      required: [true, "Address is required"],
    },
    orders: [
      {
        type: orderSchema,
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  });
  


  const User = model<User, UserModel>("User", userSchema); 

  export default User;