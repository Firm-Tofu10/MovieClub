const router = require('express').Router();
const { User } = reequire('../../models');
const { Review } = require('../../models');
const withAuth = require('../../utils/auth');

//Create new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

//Login for user/verify
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        
        if (!userData) {
            res
              .status(400)
              .json({ message: 'Incorrect email or password' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
              .status(400)
              .json({ message: 'Incorrect email or password' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'Logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

//logout user
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });

    } else {
        res.status(404).end();
    }
});

//GET users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['[password]'] }
    })
    .then(userData => res.json(userData))
    .catch(err => {
        res.status(500).json(err);
        console.log(err);
    });

});

//Get single user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Review,
                attributes: ['id', 'title', 'description', 'genre', 'reviewer_id']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_name', 'review_id'],
                include: {
                    model: Review,
                    attributes: ['title']
                }
            }
        ]
    })
    .then(userData => {
        if(!userData) {
            res.status(404).json({ message: 'No user found with this id'})
            return
        }
        res.json(userData);
    })
    .catch(err => {
        res.status(500).json(err);
        console.log(err);
    });
});

module.exports = router;