import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv"

dotenv.config()

export const signup = async (req, res) => {
  try {
    const {username, email, password} = req.body;
    // Validasi input
    if (!username || !email || !password) {
      return res.status(400).json({message: "Semua field harus diisi"});
    }
    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({message: "Email sudah digunakan"});
    }
    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    // Simpan user ke database
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });
    await newUser.save();

    res.status(201).json({message: "Akun berhasil dibuat"});
  } catch (error) {
    res.status(500).json({message: `Terjadi kesalahan server ${error}`});
  }
};

//login
export const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({message: "Email dan password wajib diisi"});
    }

    // Cek apakah pengguna ada di database
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({message: "Email atau password salah"});
    }

    // Bandingkan password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({message: "Email atau password salah"});
    }

    // Buat access token
    const accessToken = jwt.sign(
      {userId: user._id},
      process.env.ACCESS_TOKEN_SECRET, // Gunakan environment variable
      {expiresIn: "1h"}
    );

    // Buat refresh token
    const refreshToken = jwt.sign(
      {userId: user._id},
      process.env.REFRESH_TOKEN_SECRET, // Gunakan environment variable
      {expiresIn: "7d"}
    );

    // Simpan refresh token di database
    user.refreshToken = refreshToken;
    await user.save();

    // Kirim respons ke client
    res.status(200).json({
      message: "Login berhasil",
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error("Login Error:", error);
    res
      .status(500)
      .json({message: `Terjadi kesalahan server: ${error.message}`});
  }
};
