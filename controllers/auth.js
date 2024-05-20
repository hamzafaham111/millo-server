const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Register a new user
const signup = async (req, res, next) => {
  const { username, email, password} = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(200).json({ message: "email already exist" });
  } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save().then(()=>{
        res.status(200).json({ message: 'Registration successful' });
      }).catch((error)=>{
        res.status(200).json({ message: error })
      })
  }
};

// Login with an existing user
const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await userExist.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: userExist._id }, process.env.SECRET_KEY, {
      expiresIn: "1 hour",
    });
    res.status(200).json({ token:token, message:"logged in successfully"});
  } catch (error) {
    next(error);
  }

};

module.exports = { signup, signin };
