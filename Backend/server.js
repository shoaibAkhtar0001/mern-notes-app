import express from 'express';
import notesRoutes from './src/routes/notesroutes.js';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// ✅ CORS (allow frontend + local)
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://mern-notes-app.vercel.app" // change to your actual Vercel URL later
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/notes", notesRoutes);

// ✅ Use ENV PORT (RENDER REQUIRED)
const PORT = process.env.PORT || 5001;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("DB connection failed:", err);
    });
