import express from "express";
import {
  checkBalanceController,
  depositController,
  withdrawController,
  historyController,
} from "../controllers/bank.js";

export const bankRouter = new express.Router();

// Баланс шалгах
bankRouter.get("/check-balance/:userId", checkBalanceController);

// Deposit хийх
bankRouter.post("/deposit/:userId", depositController);

// Withdrawal хийх
bankRouter.post("/withdraw/:userId", withdrawController);

// History авах
bankRouter.get("/history/:userId", historyController);
