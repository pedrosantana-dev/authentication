const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/auth_test',
    { useNewUrlParser: true });

const apiRoutes = require('./routes/api');
const auth = require('./routes/auth');

app.use('/api', apiRoutes);
app.use('/auth', auth);


app.use((req, res, next) => {
    res.status(404).send('Not found');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor executando na porta', PORT);
});