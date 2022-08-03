const sequelize = require('../config/connection');
const {User, Review, Reviewer} = require('../models');

const userData = require('./userData.json')
const reviewerData = require('./reviewerData.json')
const reviewData = require('./reviewData.json');

const seedDatabase = async () => {
  await sequelize.sync({force: true});

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const reviewers = await Reviewer.bulkCreate(reviewerData, {
    individualHooks: true,
    returning: true,
  })

  for (const review of reviewData) {
    await Review.create({
      ...review,
      reviewer_id: reviewers[Math.floor(Math.random() * reviewers.length)].id,
    })
  }

  process.exit(0);
};

seedDatabase();