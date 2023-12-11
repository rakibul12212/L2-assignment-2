import { User } from "./users.inteface";
import {  UserModel } from "./users.model";

//create data
const createUserIntoDB=async (user:User)=>{
    const data=await UserModel.create(user)
    return data;
}

//get all data
const getAllUsersFromDB = async ()=>{
    const data =await UserModel.find();
    return data;
}
export const UserServices={
    createUserIntoDB,getAllUsersFromDB,
}