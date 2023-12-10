



import User from "../users.model"
import { User } from "./users.inteface"

const createUserIntoDB = async (userData:User)=>{
    const user = await User.create(userData);
    return user;
}
export const UserServices ={
    createUserIntoDB
}