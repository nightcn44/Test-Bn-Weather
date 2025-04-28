const user = require('../models/usermodels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
  try {
    const data = await user.find({}).exec();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('');
  }
};

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await user.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newdata = new user({ username, password: hashedPassword });

    await newdata.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Register failed' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await user.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Username not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
    console.log('')
  }
};
