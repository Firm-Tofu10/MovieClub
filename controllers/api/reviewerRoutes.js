const router = require('express').Router();
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

//logout reviewer
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });

    } else {
        res.status(404).end();
    }
});

//update reviewer
router.put('/:id', withAuth, (req, res) => {
    Reviewer.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(reviewerData => {
        if(!reviewerData[0]) {
            res.status(404).json({ message: 'No user found with this id' })
            return;
        }
        res.json(reviewerData);
    })
    .catch(err => {
        res.status(500).json(err);
        console.log(err);
    });
});

//delete reviewer
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(reviewerData => {
        if (!reviewerData) {
            res.status(404).json({ message: 'No user found with this id'})
            return;
        }
        res.json(reviewerData);
    })
    .catch(err => {
        res.status(500).json(err);
        console.log(err);
    });
});

module.exports = router;