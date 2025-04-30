import express from "express"
import cors from "cors"
import connectDB from "./config/db/db.js"
import userRoute from "./src/routers/auth.route.js"
import userDashboard from "./src/routers/dashboard.route.js"
const app = express()
const port = 3000

connectDB()
app.use(cors())
app.use(express.json())
// Routers
app.use("/api", userRoute)
app.use("/api", userDashboard)
app.listen(port, () => console.log(`server berjalan di port ${port}`))
