import express from "express";
import notesRoutes from "./src/routes/notesroutes.js";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

/* ✅ SINGLE CORS CONFIG (LOCAL + VERCEL) */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mern-notes-ninu7s4ru.vercel.app",
      "https://mern-notes-ninu7s4ru-shoaibakhtar0001s-projects.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

// Routes
app.use("/api/notes", notesRoutes);

// ✅ Render PORT
const PORT = process.env.PORT || 5001;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });
