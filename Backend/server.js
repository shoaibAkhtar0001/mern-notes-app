import express from 'express';
import notesRoutes from './src/routes/notesroutes.js';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
}));

app.use(express.json());
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(5001, () => {
        console.log("Server is running on port 5001");
    });
});