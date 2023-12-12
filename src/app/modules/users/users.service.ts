import { TPartialUser, TUser } from './users.inteface';
import { User } from './users.model';
import bcrypt from 'bcrypt';
import config from '../../config';

//create data
const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('user already exists');
  }
  const data = await User.create(userData); 
  return data;
};

//get all data
const getAllUsersFromDB = async () => {
  const data = await User.find();
  return data;
};

//get single user
const getSingleUserFromDB = async (userId: number) => {
  const data = await User.isUserExists(userId);
  return data;
};

//delete user
const deleteUserFromDB = async (userId: number) => {
  const result = await User.updateOne(
    { userId },
    { $set: { isDeleted: true } },
  );
  return result;
};

//updated user
const updateUserByIdIntoDB = async (userId: number, userData: TPartialUser) => {
  if (userData.password) {
    userData.password = await bcrypt.hash(
      userData.password,
      Number(config.bcrypt_salt_rounds),
    );
  }

  const { fullName, address, ...remainingData } = userData;

  const updatedDocument: Record<string, unknown> = { ...remainingData };

  if (fullName && Object.keys(fullName).length > 0) {
    for (const [key, value] of Object.entries(fullName)) {
      updatedDocument[`fullName.${key}`] = value;
    }
  }

  if (address && Object.keys(address).length > 0) {
    for (const [key, value] of Object.entries(address)) {
      updatedDocument[`address.${key}`] = value;
    }
  }

  console.log(updatedDocument);

  const data = await User.findOneAndUpdate(
    { userId },
    { $set: updatedDocument },
    {
      runValidators: true,
      new: true,
      projection: { password: 0, __v: 0, _id: 0, isDeleted: 0, orders: 0 },
    },
  );

  return data;
};
export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserByIdIntoDB,
};
