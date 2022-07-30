const router = require('express').Router();
const { Review, User, Reviewer, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Reviewer,
          attributer: ['name']
        },
        {
          model: Comment,
          attributes: ['comment_text']
        },
      ],
    });

    const reviews = reviewData.map((reviews) => reviews.get({ plain: true }));

    res.render('homepage', {
      reviews,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get('/review/:id', async (req, res) => {
  try {
    const reviewData = await Review.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Reviewer,
          attributer: ['name']
        },
        {
          model: Comment,
          attributes: ['comment_text']
        },
      ]
    });

    const reviews = reviewData.get({ plain: true });

    res.render('review', {
      ...review,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});