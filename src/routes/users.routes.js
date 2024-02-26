import express from "express";
import { prisma } from "../models/index.js";
import { UsersController } from "../controllers/users.controller.js";
import { UsersService } from "../services/users.service.js";
import { UsersRepository } from "../repositories/users.repository.js";

const router = express.Router();

const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

//회원가입
router.post("/sign-up", usersController.signUp);
//로그인
router.post("/sign-in", usersController.signIn);

export default router;
