import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log('Already connected to MongoDB')
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'real_estate',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true;

        console.log('Successfully connected to MongoDB')
    } catch (error) {
        console.log(error.message)
    }
}