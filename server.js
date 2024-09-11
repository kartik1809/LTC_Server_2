import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import cors from 'cors';
import reportRoutes from './routes/report.route.js';
import Models from './mongo.js';

const { Collection, Appointment } = Models;

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define routes
app.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const check = await Collection.findOne({ email: email });
        if (check) {
            res.json("exist");
        } else {
            res.json("not exist");
        }
    } catch (e) {
        console.error(e);
        res.status(500).json("error");
    }
});

app.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
    };
    try {
        const check = await Collection.findOne({ email: email });
        if (check) {
            res.json("exist");
        } else {
            await Collection.insertMany([data]);
            res.json("not exists");
        }
    } catch (e) {
        console.error(e);
        res.status(500).json("error");
    }
});
app.post("/appointment", async (req, res) => {
    const { doctorName, appointmentDay, appointmentTime } = req.body;
    const data = {
        doctorName : doctorName,
        appointmentDay : appointmentDay,
        appointmentTime: appointmentTime
    };
    try {
        const check = await Appointment.findOne({ doctorName: doctorName });
        if (check) {
            res.json("no");
        } else {
            await Appointment.insertMany([data]);
            res.json("done");
        }
    } catch (e) {
        console.error(e);
        res.status(500).json("error");
    }
});
app.get('/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find({});
        res.json(appointments);
    } catch (e) {
        console.error(e);
        res.status(500).json("error");
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('<h1>Server is running</h1>');
});

app.use('/api/v1/reports', reportRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
