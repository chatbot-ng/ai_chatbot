
import { connect } from 'mongoose';
import { DB_CONNECTION_URL } from '../config/config.js';

async function connectDatabase() {

    const result = await connect(DB_CONNECTION_URL);

    return result;
}

export default connectDatabase;