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

app.get('/kandang', async (req, res) => {
    try {
        const kandang = await db.Kandang.findAll();
        res.send(kandang);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});


app.put('/kandang/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const kandang = await db.Kandang.findByPk(id);
        if (!kandang) {
            return res.status(404).send({message: 'Kandang not found'});
        }
        await kandang.update(data); 
        res.send({message: 'Kandang Berhasil Diupdate', kandang});
    }catch (error) {
        res.status(500).send({message: error.message});
    }
});

app.delete('/kandang/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const kandang = await db.Kandang.findByPk(id);
        if (!kandang) {
            return res.status(404).send({message: 'Kandang tidak ditemukan'});
        }
        await kandang.destroy();
        res.send({message: 'Kandang Berhasil Dihapus'});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});


