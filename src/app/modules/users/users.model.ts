import { Schema, model } from 'mongoose';
import {
  IAddress,
  IFullName,
  IOrder,
  TUser,
  UserModel,
} from './users.inteface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';

const fullNameSchema = new Schema<IFullName>(
  {
    firstName: {
      type: String,
      required: [true, 'first name requred'],
      trim: true,
      validate: (value: string) => validator.isAlpha(value),
      massage: '{VALUE} is not valid',
    },
    lastName: {
      type: String,
      required: [true, 'last name required'],
      trim: true,
      validate: (value: string) => validator.isAlpha(value),
      massage: '{VALUE} is not valid',
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
      required: [true, 'street name required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'city name required'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'country required'],
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const orderSchema = new Schema<IOrder>(
  {
    productName: {
      type: String,
      required: [true, 'product name required'],
      trim: true,
    },
    price: {
      type: Number,
      min: 0,
      required: [true, 'price required'],
      trim: true,
    },
    quantity: {
      type: Number,
      min: [0, 'min quantity 1'],
      required: [true, ' quantity required'],
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'userId required'],
    trim: true,
  },
  username: {
    type: String,
    required: [true, 'username required'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'password required'],
    trim: true,
  },
  fullName: {
    type: fullNameSchema,
    required: [true, 'fullname required'],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, 'age required'],
    trim: true,
    min: [1, 'min age 1'],
  },
  email: {
    type: String,
    required: [true, 'email required'],
    trim: true,
    validate: (value: string) => validator.isEmail(value),
    massage: '{VALUE} is not valid email type',
  },
  isActive: {
    type: Boolean,
    required: true,
    trim: true,
    default: true,
  },
  hobbies: [
    {
      type: String,
      required: [true, 'hobbies required'],
      trim: true,
    },
  ],
  address: {
    type: addressSchema,
    required: [true, 'address required'],
    trim: true,
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

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hash password
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//remove password 
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

//create pre-hook for hide deletedUser
userSchema.pre('find', async function (next) {
  this.find({ isDeleted: false });
  next();
});
userSchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: false });
  next();
});

//create pre hook for hide deletedUser:
userSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: false } });
  next();
});
userSchema.statics.isUserExists = async function (userId: string) {
  const isUserExists = await User.findOne(
    { userId },
    { password: 0, _id: 0, __v: 0, orders: 0, isDeleted: 0 },
  );

  return isUserExists;
};
export const User = model<TUser, UserModel>('User', userSchema);
