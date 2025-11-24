import fs from "fs";
import path from "path";

export class BankService {
  constructor() {
    this.file = path.join(process.cwd(), "data/history.json"); // full path
    try {
      this.data = JSON.parse(fs.readFileSync(this.file, "utf8"));
    } catch {
      this.data = {};
    }
  }

  save() {
    fs.writeFileSync(this.file, JSON.stringify(this.data, null, 2), "utf8");
  }

  checkBalance(username) {
    return this.data[username] || [];
  }

  deposit(username, amount) {
    const history = this.data[username] || [];
    const lastBalance = history.length
      ? history[history.length - 1].balance
      : 0;
    const newBalance = lastBalance + amount;

    const record = {
      type: "deposit",
      amount,
      balance: newBalance,
      currentBalance: amount,
    };

    history.push(record);
    this.data[username] = history;
    this.save();
    return record;
  }

  withdraw(username, amount) {
    const history = this.data[username] || [];
    const lastBalance = history.length
      ? history[history.length - 1].balance
      : 0;
    if (lastBalance < amount) throw new Error("Insufficient funds");

    const newBalance = lastBalance - amount;
    const record = {
      type: "withdrawal",
      amount,
      balance: newBalance,
      currentBalance: -amount,
    };

    history.push(record);
    this.data[username] = history;
    this.save();
    return record;
  }
}
