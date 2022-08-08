import mongoose from 'mongoose';
import config from "../../../../../api/src/config"

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongoConnection = {
    isConnected: 0
}

export const connect = async() => {

    if ( mongoConnection.isConnected ) {
        console.log('Ya estabamos conectados');
        return;
    }

    if ( mongoose.connections.length > 0 ) {
        mongoConnection.isConnected = mongoose.connections[0].readyState;

        if ( mongoConnection.isConnected === 1 ) {
            console.log('Usando conexión anterior');
            return;
        }

        await mongoose.disconnect();
    }
/*
    await mongoose.connect( process.env.MONGO_URL || '');
    mongoConnection.isConnected = 1;
    console.log('Conectado a MongoDB:', process.env.MONGO_URL );
*/


        try{
        const db= await mongoose.connect(`mongodb+srv://mundomarket:${config.MONGO_PASSWORD}@cluster0.tqn5t.mongodb.net/${config.MONGO_DATABASE}?retryWrites=true&w=majority`,{

        });
        console.log("connected to database :", db.connection.name);
        }catch(error)
        {console.error(error)}


        }





export const disconnect = async() => {
    
    if ( process.env.NODE_ENV === 'development' ) return;

    if ( mongoConnection.isConnected === 0 ) return;

    await mongoose.disconnect();
    mongoConnection.isConnected = 0;

    console.log('Desconectado de MongoDB');
}

export * as db from './db';