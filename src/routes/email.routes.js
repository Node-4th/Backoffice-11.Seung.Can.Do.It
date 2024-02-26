import express from "express";
import { Prisma } from "@prisma/client";
import Jwt from "jsonwebtoken";

const router = express.Router();

router.get("/auth/token", async (req, res) => {});

export default router;
