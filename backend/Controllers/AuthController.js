const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }
    const newUser = new UserModel({ name, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res
      .status(201)
      .json({ message: "Account Created Successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal server error ", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "User not found";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(403)
        .json({ message: "Invalid password", success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      message: "User logged in",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  signup,
  login,
};
