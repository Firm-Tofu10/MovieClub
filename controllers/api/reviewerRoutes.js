const router = require('expres').Router();
const { Reviewer, Review } = require('../../models');
const withAuth = require('../../utils/auth');

//Login Reviewer
router.post('/login', async (req, res) => {
    try {
        const reviewerData = await Reviewer.findOne({ where: { email: req.body.email }});

        if (!reviewerData) {
            res
            .status(400)
            .json({ message: 'Incorrect email or password '});
            return;
        }

        const validPassword = await reviewerData.checkPassword(req.body.password);

        if (!validPassword) {
            res
            .status(400)
            .json({ message: 'Incorrect email or password' });
            return;
        }
        req.session.save(() => {
            req.session.reviewer_id = reviewerData.isSoftDeleted;
            req.session.logged_in = true;

            res.json({ reviewer: reviewerData, message: 'Logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

