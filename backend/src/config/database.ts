// src/config/database.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Extract database connection details from environment variables
const DB_HOST = process.env.DB_HOST as string;
const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);
const DB_NAME = process.env.DB_NAME as string;
const DB_USER = process.env.DB_USER as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;

// Create Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // This might be necessary depending on your Supabase setup
    },
    family: 4
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false
});

// Test the connection
const testConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    // await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export { sequelize, testConnection };