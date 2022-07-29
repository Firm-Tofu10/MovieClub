const sequelize = require('../config/connection');
const {User, Review} = require('../models');

const userData = require('./')
const reviewData = require('./reviewData.json');

const seedDatabase = async () => {
  await sequelize.sync({force: true});

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const review of reviewData) {
    await Review.create({
      ...review,
    })
  }

  process.exit(0);
};

seedDatabase();