const User = require('./User');
const Review = require('./Review');
const Reviewer = require('./Reviewer');
const Comment = require('./Comment');

//Reviewer has many reviews
Reviewer.hasMany(Review, {
    foreignKey: 'reviewer_id'
});

//Review can only belong to Reviewer
Review.belongsTo(Reviewer, {
    foreignKey: 'reviewer_id'
});

//User has many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

//Comment can only belong to one User
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

//Review can have many comments
Review.hasMany(Comment, {
    foreignKey: 'review_id'
});

//Comment belongs to Review
Comment.belongsTo(Review, {
    foreignKey: 'review_id'
});

module.exports = { User, Review, Reviewer, Comment };

