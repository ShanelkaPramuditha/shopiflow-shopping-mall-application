import mongoose from 'mongoose';
import { DATABASE_CONFIG } from '../constants/constants.js';

const uri = `${DATABASE_CONFIG.uri}/${DATABASE_CONFIG.dbName}`;

async function dbConnect() {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(DATABASE_CONFIG.uri, { dbName: DATABASE_CONFIG.dbName });
    console.log('🛢️ Database connected');
    return true;
  } catch (error) {
    console.log('❌🛢️ Database connection failed: ', error);
    return false;
  }
}

export default dbConnect;
