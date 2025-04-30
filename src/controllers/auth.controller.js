import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import dotenv from "dotenv"

dotenv.config()

////////// SIGN UP //////////
export const register = async (req, res) => {
  try {
    const {username, email, password} = req.body
    // Input validation
    if (!username || !email || !password) {
      return res.status(400).json({message: "All fields are required"})
    }
    // Check if email is already registered
    const existingUser = await User.findOne({email})
    if (existingUser) {
      return res.status(400).json({message: "Email is already in use"})
    }
    // Hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)
    // Save user to database
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })
    await newUser.save()

    res.status(201).json({
      success: true,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    })
  } catch (error) {
    res.status(500).json({message: `Server error occurred: ${error}`})
  }
}

////////// LOGIN //////////
export const login = async (req, res) => {
  try {
    const {email, password} = req.body

    // Input validation
    if (!email || !password) {
      return res.status(400).json({message: "Email and password are required"})
    }

    // Check if user exists in database
    const user = await User.findOne({email}).select("+password")
    if (!user) {
      return res.status(400).json({message: "Invalid email or password"})
    }

    // Compare passwords
    const isMatch = await bcryptjs.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({message: "Invalid email or password"})
    }

    // Create access token
    const accessToken = jwt.sign(
      {userId: user._id},
      process.env.JWT_SECRET, // Use environment variable
      {expiresIn: "1h"}
    )

    // Create refresh token
    const refreshToken = jwt.sign(
      {userId: user._id},
      process.env.REFRESH_KEY, // Use environment variable
      {expiresIn: "7d"}
    )

    // Save refresh token to database
    user.refreshToken = refreshToken
    await user.save()

    // Send response to client
    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken
    })
  } catch (error) {
    console.error("Login Error:", error)
    res
      .status(500)
      .json({message: `Server error occurred: ${error.message}`})
  }
}