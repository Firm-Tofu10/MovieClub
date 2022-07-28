const router = require('express').Router();
const { Review, Reviewer, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');