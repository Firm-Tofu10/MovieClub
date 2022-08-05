const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if(process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Create a connection object
  sequelize = new Sequelize(
    // Database name
    process.env.DB_NAME,
    // User
    process.env.DB_USER,
    // Password
    process.env.DB_PASSWORD,
    {
      // Database location
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;