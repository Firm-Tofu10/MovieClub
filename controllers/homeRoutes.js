const router = require('express').Router();
const { Review, User, Reviewer, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [
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
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
})

router.get('/review/:id', async (req, res) => {
  try {
    const reviewData = await Review.findByPk(req.params.id, {
      include: [
        {
          model: Reviewer,
          attributer: ['name']
        },
        {
          model: Comment,
          attributes: ['comment_text'],
          include: [
            {
              model: User,
              attributer: ['user_id'],
            },
          ],
        },
      ]
    });

    const review = reviewData.get({ plain: true });

    res.render('review', {
      ...review,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Comment }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

router.get('/login', (req,res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;