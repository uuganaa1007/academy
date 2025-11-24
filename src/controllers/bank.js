import { BankService } from "../services/bank.js";

export const checkBalanceController = (req, res) => {
  const { username } = req.body;

  try {
    const bank = new BankService();
    res.send(bank.checkBalance(username));
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const historyController = (req, res) => {
  const { userId } = req.params;
  try {
    const bank = new BankService();
    res.send(bank.checkBalance(userId));
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const depositController = (req, res) => {
  const { username, amount } = req.body;
  console.log("depositController", { username, amount });
  try {
    const bank = new BankService();
    const record = bank.deposit(username, Number(amount));
    res.send(record);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const withdrawController = (req, res) => {
  const { username, amount } = req.body;

  try {
    const bank = new BankService();
    const record = bank.withdraw(username, Number(amount));
    res.send(record);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
