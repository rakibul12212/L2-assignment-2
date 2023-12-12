
import {  Model } from "mongoose";

export interface TFullName {
    firstName: string;
    lastName: string;
}
export interface IAddress {
    street: string;
    city: string;
    country: string;
  }
  export interface TOrder {
    productName: string;
    price: number;
    quantity: number;
  }
export type TUser={
    userId: number;
    username: string;
    password: string;
    fullName: TFullName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: IAddress;
    orders?: TOrder[];
    isDeleted?: boolean;
}

//for creating static
export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: number): Promise<TUser | null>;
}
