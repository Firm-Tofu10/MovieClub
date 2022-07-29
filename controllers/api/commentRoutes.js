const router = require('express').Router();
const { Comment, Review } = require('../../models');
const withAuth = require('../../utils/auth');

//Get All comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            attributes: ['id', 'comment_text', 'user_name', 'review_id'],
            include: [{
                model: Review,
                attributes: ['id', 'title', 'description', 'genre', 'reviewer_id']
            }]
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

//Create comments
router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
        comment_text: req.body.comment_text,
        review_id: req.body.post_id,
        user_id: req.session.user_id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});