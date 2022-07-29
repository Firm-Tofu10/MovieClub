const router = require('express').Router();
const { Review, Reviewer, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

//GET all reviews
router.get('/', (req, res) => {
    Review.findAll({
        attributes: ['id', 'title', 'description', 'genre', 'reviewer_id'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_name', 'review_id'],
                include: {
                    model: User,
                    attributes: ['user_name']
                }
            },
            {
                model: User,
                attributes: ['user_name']
            },
        ]
    })
    .then(reviewData => res.json(reviewData))
    .catch(err => {
        res.status(500).json(err);
        console.log(err);
    });
});
