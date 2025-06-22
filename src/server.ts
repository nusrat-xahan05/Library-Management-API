import config from './config';
import mongoose from 'mongoose';
import { app } from './app';


async function server() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log(`Connected to MongoDB using Mongoose Successfully`);

        app.listen(config.port, () => {
            console.log(`Server is Running on Port ${config.port}`);
        })
    }catch (error) {
        console.log('Failed to Connect with MongoDB: ', error);
    }
}

server();
