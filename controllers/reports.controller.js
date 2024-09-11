import fetch from 'node-fetch';
import fs from 'fs';
import FormData from 'form-data';

// Handle chest prediction
export const chest = async (req, res) => {
    try {
        const imageFile = req.file;
        if (!imageFile) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const imagePath = imageFile.path;
        const result = await predictChest(imagePath);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Handle tumor prediction
export const tumor = async (req, res) => {
    try {
        const imageFile = req.file;
        if (!imageFile) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const imagePath = imageFile.path;
        const result = await predictTumor(imagePath);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Handle fracture prediction
export const fracture = async (req, res) => {
    try {
        const imageFile = req.file;
        if (!imageFile) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const imagePath = imageFile.path;
        const result = await predictFracture(imagePath);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Helper function for chest prediction
const predictChest = async (imagePath) => {
    try {
        const formData = new FormData();
        const fileStream = fs.createReadStream(imagePath);
        formData.append('file', fileStream);

        const response = await fetch('http://localhost:5000/predict_chest', {
            method: 'POST',
            body: formData,
            headers: formData.getHeaders(),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
};

// Helper function for tumor prediction
const predictTumor = async (imagePath) => {
    try {
        const formData = new FormData();
        const fileStream = fs.createReadStream(imagePath);
        formData.append('file', fileStream);

        const response = await fetch('http://localhost:5000/predict_tumor', {
            method: 'POST',
            body: formData,
            headers: formData.getHeaders(),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
};

// Helper function for fracture prediction
const predictFracture = async (imagePath) => {
    try {
        const formData = new FormData();
        const fileStream = fs.createReadStream(imagePath);
        formData.append('file', fileStream);

        const response = await fetch('http://localhost:5000/predict_fracture', {
            method: 'POST',
            body: formData,
            headers: formData.getHeaders(),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
};
