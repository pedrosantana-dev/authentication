const ProductModel = require('../models/ProductModel');

exports.all = (req, res) => {
    ProductModel.find({}).lean().exec((err, products) => {
        if (err)
            return res.status(500).send({
                message: 'Erro interno do servidor',
                error: err
            });
        return res.send(products);
    });
}