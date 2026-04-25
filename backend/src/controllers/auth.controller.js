const userModel = require("../models/user.model");
const services = require("../services/services.cloudinary");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { fullName, email, password, gender , phone } = req.body;

  if (!fullName || fullName === "" || !email || email === "" || !password || password === "" || !gender || gender === "" || !phone || phone === "") {
    return res.status(401).json({
      success: false,
      message: "All Fields are required",
    });
  }

  if (password.length < 5) {
    return res.status(401).json({
      success: false,
      message: "Create a Strong Password",
    });
  }

  const image = await services.uploadImageToCloudinary(req.file?.path);

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User Already Exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
    gender,
    profileImage: image?.secure_url || null,
    phone
  });

  console.log(user);

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "User NOT Created ! Server Error",
    });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: "User registered SuccessFully",
    user: {
      _id: user._id,
      fullName,
      email,
      gender,
      phone
    },
  });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    const user = await userModel.findOne({ email });

    console.log(user);

    if (!user) {
      return res.status(404).json({
        message: "Something Went Wrong!",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Email or Password is Invalid",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Login Successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const logoutUser = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please login first",
    });
  }

  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });

  return res.status(200).json({
    success: true,
    message: "User successfully logged out",
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
