import express from "express";
import { UserControllers } from "./users.controller";

const router =express.Router()
//will call controller function
router.post('/',UserControllers.createUser)
router.get('/',UserControllers.getAllUsers)
router.get('/:userId',UserControllers.getSingleUser)

export const UserRoutes = router;
