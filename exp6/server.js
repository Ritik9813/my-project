const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const authMiddleware = require("./middleware/auth");

const app = express();
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/bankdb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Public Route
app.get("/public", (req, res) => {
  res.send("This is a public route. No authentication required.");
});

// Create dummy users
app.post("/create-users", async (req, res) => {
  await User.deleteMany({}); // clear old data

  const users = await User.insertMany([
    { name: "Ritik Kumar Singh", password: "23bia", balance: 50035 },
    { name: "Bob", password: "456", balance: 1500 }
  ]);

  res.status(201).json({ message: "Users created", users });
});

// Login - generate JWT token
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ name: username });
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, "mysecretkey", { expiresIn: "1h" });
  res.json({ token });
});


// Protected Routes
app.get("/balance", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ balance: user.balance });
});

app.post("/deposit", authMiddleware, async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) return res.status(400).json({ message: "Enter a valid amount" });

  const user = await User.findById(req.user.id);
  user.balance += amount;
  await user.save();
  res.json({ message: `Deposited $${amount}`, newBalance: user.balance });
});

app.post("/withdraw", authMiddleware, async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) return res.status(400).json({ message: "Enter a valid amount" });

  const user = await User.findById(req.user.id);
  if (user.balance < amount) return res.status(400).json({ message: "Insufficient balance" });

  user.balance -= amount;
  await user.save();
  res.json({ message: `Withdrew $${amount}`, newBalance: user.balance });
});

app.post("/transfer", authMiddleware, async (req, res) => {
  const { toUserId, amount } = req.body;
  if (!toUserId || !amount || amount <= 0) return res.status(400).json({ message: "Provide valid details" });

  const fromUser = await User.findById(req.user.id);
  const toUser = await User.findById(toUserId);

  if (!toUser) return res.status(404).json({ message: "Receiver not found" });
  if (fromUser.balance < amount) return res.status(400).json({ message: "Insufficient balance" });

  fromUser.balance -= amount;
  toUser.balance += amount;

  await fromUser.save();
  await toUser.save();

  res.json({
    message: `Transferred $${amount} from ${fromUser.name} to ${toUser.name}`,
    senderBalance: fromUser.balance,
    receiverBalance: toUser.balance
  });
});

// Start server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
