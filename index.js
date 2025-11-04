// npm init
// npm i express mysql2 sequelize dotenv
// npm i -D nodemon sequelize-cli
// git init
// npx sequelize init
// npm i dotenv


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

