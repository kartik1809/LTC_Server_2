import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://kanakbpandey2023:suytwqo0qaSWhu2H@userdata.9x2ov.mongodb.net/?retryWrites=true&w=majority&appName=Userdata")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
});

const appointmentSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: true
    },
    appointmentDay: {
        type: String,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    }
});

const Collection = mongoose.model("Collection", userSchema);
const Appointment = mongoose.model("Appointment",appointmentSchema);
export default {
    Collection,
    Appointment
};
