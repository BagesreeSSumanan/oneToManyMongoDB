import dotenv from 'dotenv';
dotenv.config(); // load .env variables

export const port = process.env.PORT;
export const ConnectionString = process.env.ConnectionString;
