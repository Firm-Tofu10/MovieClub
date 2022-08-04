const router = require('express').Router();
const { Comment, Review } = require('../../models');
const withAuth = require('../../utils/auth');

//Get All comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            attributes: ['id', 'comment_text', 'user_id', 'review_id'],
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
        review_id: req.body.review_id,
        user_id: req.session.user_id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

//Delete comments
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                
            },
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found'})
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

module.exports = router;