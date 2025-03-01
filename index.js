import express from "express";
import cors from "cors"
import connectDB from "./config/db/db.js";
import userRoute from "./src/routers/user.route.js";
const app = express();
const port = 3000;

connectDB();
app.use(cors());
app.use(express.json());
app.use(userRoute);

app.listen(port, () => console.log(`server berjalan di port ${port}`));
