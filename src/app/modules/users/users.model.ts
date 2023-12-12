import { Schema,model } from "mongoose";
import { IAddress, TFullName, TOrder, TUser, UserMethods, UserModel } from "./users.inteface";
import validator from 'validator';
import bcrypt from 'bcrypt'
import config from "../../config";
const fullNameSchema = new Schema<TFullName>(
    {
      firstName: {
        type: String,
        required:[ true,'first name is requred'],
        trim:true,
        validate:(value:string)=>validator.isAlpha(value),
        massage:'{VALUE} is not valid',
        
      },
      lastName: {
        type: String,
        required: [true,"last name is required"],
        trim:true,
        validate:(value:string)=>validator.isAlpha(value),
        massage:'{VALUE} is not valid',
        
      },
    },
    {
      _id: false,
    },
  );
  
  const addressSchema = new Schema<IAddress>(
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
    },
    {
      _id: false,
    },
  );
  
  const orderSchema = new Schema<TOrder>(
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
    },
    {
      _id: false,
    },
   
  );
  
  const userSchema = new Schema<TUser,UserModel>({
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
      validate:(value:string)=>validator.isEmail(value),
        massage:'{VALUE} is not valid email type',
      
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
  


  //pre save middleware /hook 
  userSchema.pre('save',async function(next){
   // eslint-disable-next-line @typescript-eslint/no-this-alias
   const user = this


 // hasing password and save into db
    user.password = await bcrypt.hash(user.password,Number(config.bcrypt_salt_rounds));
    next()
  })


  //post save middleware /hook 
  userSchema.post('save',function(){
    console.log(this,'post hook : we saved our data');
  })

  

//creating a custom static method
userSchema.statics.isUserExists = async function(userId:number){
  const existingUser = await User.findOne({userId})
  return existingUser;
}

 export const User =model<TUser,UserModel>('User',userSchema)