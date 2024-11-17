// Core
import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const dbLogin = process.env.MONGO_INITDB_ROOT_USERNAME;
const dbPassword = process.env.MONGO_INITDB_ROOT_PASSWORD;
const dbName = process.env.MONGO_DATABASE
const uri = `mongodb://${dbLogin}:${dbPassword}@localhost:27017/${dbName}?authSource=admin`;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Successfully connected to MongoDB!');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
}

export default connectToDatabase;
