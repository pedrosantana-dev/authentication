const PersonModel = require('../models/PersonModel');

exports.all = (req, res) => {
    PersonModel.find({}).lean().exec((err, people) => {
        if (err)
            return res.status(500).send({
                message: 'Erro interno do servidor',
                error: err
            });
        return res.send(people);
    })
}