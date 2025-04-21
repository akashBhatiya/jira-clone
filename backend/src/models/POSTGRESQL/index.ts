import { sequelize } from '../../config/database';
import { User } from './userModel';

// Define relationships between models

// Sync all models with database
const syncDatabase = async (force = false): Promise<void> => {
    try {
        await sequelize.sync({ force });
        console.log('Database synchronized successfully');
    } catch (error) {
        console.error('Failed to synchronize database:', error);
        process.exit(1);
    }
};

export {
    sequelize,
    User,
    syncDatabase
};