import dotenv from 'dotenv';
dotenv.config()

export const config={
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: process.env.PUSHER_USETLS
}

