
import mongoose from 'mongoose';
import config from '../config/config';

export async function connectDatabase() {

    const result = await mongoose.connect(config.DB_CONNECTION_URL);

    return result;
}

// module.exports = connectDatabase;