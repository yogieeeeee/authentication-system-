import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("success to connet")
  } catch (error) {
    console.error(`gagal menyambungkan ke databse ${error}`)
  }
}

export default connectDB
