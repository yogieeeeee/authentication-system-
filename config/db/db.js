import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/blogWebsiteDB");
    console.log("lancar tuan");
  } catch (error) {
    console.error(`gagal menyambungkan ke databse ${error}`);
  }
};

export default connectDB;
