import express from "express";
import { sendContactEnquiry } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", sendContactEnquiry);

export default router;