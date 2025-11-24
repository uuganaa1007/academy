import fs from "fs";

export const login = (req, res) => {
  const { email, password } = req.body;

  // users.json унших
  const users = JSON.parse(fs.readFileSync("data/users.json"));

  // хэрэглэгч хайх
  const found = users.find((u) => u.email === email && u.password === password);

  if (!found) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Амжилттай бол хэрэглэгчийн дата буцаана
  return res.json({
    message: "Success",
    user: found,
  });
};
