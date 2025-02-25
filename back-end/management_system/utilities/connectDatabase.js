import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config()

const URL = process.env.MONGO_URL
const connect = () => {
    mongoose.connect(URL)
        .then(() => {
                console.log("Connected to database");
            }
        ).catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });
}

export default connect