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

//Get single review
router.get('/:id', (req, res) => {
    Review.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'description', 'genre', 'reviewer_id'],
        include: [
            {
                model: Reviewer,
                attributes: ['name']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_name'],
                include: {
                    model: User,
                    attributes: ['user_name']
                }
            }
        ]
    })
    .then(reviewData => {
        if (!reviewData) {
            res.status(404).json({ message: 'No Review found with this id'});
            return
        }
        res.json(reviewData);
    })
    .catch(err => {
        res.status(500).json(err);
        console.log(err);
    });
});

//CREATE new review
router.post('/', withAuth, (req, res) => {
    Review.create({
        title: req.body.title,
        description: req.body.description,
        reviewer_id: req.session.reviewer_id
    })
    .then(reviewData => res.json(reviewData))
    .catch(err => {
        res.status(500).json(err);
        console.log(err);
    });
});