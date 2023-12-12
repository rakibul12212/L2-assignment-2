import { Request, Response } from 'express';
import { UserServices } from './users.service';
import userValidationSchema, {updateValidationSchema,} from './users.zodValidation';
import { TPartialUser } from './users.inteface';


//create data
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const validateUser = userValidationSchema.parse(userData);
    const data = await UserServices.createUserIntoDB(validateUser);
    res.status(200).json({
      success: true,
      massage: 'user is created successfully',
      data: data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      massage: err.massage || 'something went wrong',
      error: err,
    });
  }
};

//get all user
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      massage: 'users are retrive successfully',
      data: data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      massage: err.massage || 'something went wrong',
      error: err,
    });
  }
};

//get single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    if (!userId) {
      return res.status(200).send({
        success: false,
        message: 'Please provide an userId',
        error: {
          code: 404,
          description: 'give userId',
        },
      });
    }

    const user = await UserServices.getSingleUserFromDB(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: user,
    });
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
      error: {
        code: 500,
        description: err.message,
      },
    });
  }
};

// delete user

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    const user = await UserServices.deleteUserFromDB(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(200).send({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
      error: {
        code: 500,
        description: err,
      },
    });
  }
};

// update user
const updateUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const userData = req.body;

    const validateUserData: TPartialUser =updateValidationSchema.parse(userData);
    const user = await UserServices.getSingleUserFromDB(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });
    }

    // update data:
    const data = await UserServices.updateUserByIdIntoDB(
      userId,
      validateUserData
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "User didn't updated successfully!",
        error: {
          code: 404,
          description: "User didn't updated successfully!",
        },
      });
    }

    res.status(200).send({
      success: true,
      message: 'User updated successfully!',
      data: data,
    });
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
      error: {
        code: 500,
        description: err.message,
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUserById,
};
