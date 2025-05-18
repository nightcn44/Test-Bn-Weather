const user = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await user.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newData = new user({ username, password: hashedPassword });

    await newData.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Register failed" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const data = await user.findOne({ username });
    if (!data) {
      return res.status(400).json({ error: "Username not found" });
    }

    const match = await bcrypt.compare(password, data.password);
    if (!match) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: data._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Login failed" });
  }
};
