import { Model } from 'mongoose';

export interface IFullName {
  firstName: string;
  lastName: string;
}
export interface IAddress {
  street: string;
  city: string;
  country: string;
}
export interface IOrder {
  productName: string;
  price: number;
  quantity: number;
}
export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: IFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: IAddress;
  orders?: IOrder[];
  isDeleted?: boolean;
};
export type TPartialUser = {
  userId?: number;
  username?: string;
  password?: string;
  fullName?: Partial<IFullName>;
  age?: number;
  email?: string;
  isActive?: boolean;
  hobbies?: string[];
  address?: Partial<IAddress>;
  orders?: IOrder[];
  isDeleted?: boolean;
};
//for creating static
export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: number): Promise<TUser | null>;
}
