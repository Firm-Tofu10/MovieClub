const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helper');
const hbs = exphbs.create({helpers});
const user = require('models/user');
const path = require('path');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const app = express();
const PORT = 3001;
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess))
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
console.log("HERE")
app.use(routes);

sequelize.sync({force: false}).then(() => {
  console.log(PORT)
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))
});

