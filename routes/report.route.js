import express from 'express';
import multer from 'multer';
import { chest, tumor, fracture } from '../controllers/reports.controller.js';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Define routes for file upload and predictions
router.post('/predict_chest', upload.single('file'), chest);  
router.post('/predict_tumor', upload.single('file'), tumor);  
router.post('/predict_fracture', upload.single('file'), fracture);  

export default router;
