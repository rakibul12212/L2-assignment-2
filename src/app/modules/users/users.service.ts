import { User } from "./users.inteface";
import {  UserModel } from "./users.model";

const createUserIntoDB=async (user:User)=>{
    const data=await UserModel.create(user)
    return data;
}
export const UserServices={
    createUserIntoDB
}