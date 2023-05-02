import User from "../models/User.js";
import bcrypt from "bcrypt";

// Login Controller
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter All Fields",
      });
    }

    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Email or Password",
      });
    }

    delete user.password;

    return res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}`,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Register Controller
export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter All Fields",
      });
    }

    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already Exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
      user: newUser,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Get User detail controller
export const getUserController = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(409).json({
        success: false,
        message: "User does not exist",
      });
    }

    return res.status(200).json({
      success: true,
      users: user,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Logout Controller
export const logoutController = async (req, res) => {
  try {
    res.status(200).cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
  }).json({
      success : true,
      message: "You have been logged out Successfully",
  })
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Get all users controller
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    if (!users) {
      return res.status(409).json({
        success: false,
        message: "No User exists, create new user first",
      });
    }

    return res.status(200).json({
      success: true,
      users: users,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};