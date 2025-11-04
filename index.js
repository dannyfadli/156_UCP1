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

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server Stared`);
    })
})
    .catch((err) => {
        console.log('Error: ' + err);
})

app.post('/kandang', async (req, res) => {
    const data = req.body;
    try {
        const kandang = await db.Kandang.create(data);
        res.send(kandang);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});


