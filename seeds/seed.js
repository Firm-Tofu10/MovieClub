const sequelize = require('../config/connection');
const {User, Review, Reviewer, Comment} = require('../models');

const userData = require('./userData.json')
const reviewerData = require('./reviewerData.json')
const reviewData = require('./reviewData.json');
const commentData = require('./commentData.json')

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
    })
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
    })
  }

  process.exit(0);
};

seedDatabase();