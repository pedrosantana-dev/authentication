const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const consts = require('../consts');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        let u = await UserModel.findOne({ email: req.body.email });
        if (!u) {
            const user = new UserModel(req.body);
            user.password = bcrypt.hashSync(req.body.password, consts.bcryptSalts);
            await user.save();
            delete user.password;
            res.status(200).send(user);
        }
        else {
            res.status(403).send({ message: 'Email already registered', error: {} });
        }
    }
    catch (error) {
        res.status(500).send({ message: 'Error while saving the user', error })
    }
}

exports.login = (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ emai: email }).lean().exec((err, user) => {
        if (err) {
            return res.status(500).send({ message: 'Server error', error: err });
        }

        const auth_err = (password == '' || password == null || !user);


        if (!auth_err) {
            if (bcrypt.compareSync(password, user.password)) {
                let token = jwt.sign({ _id: user._id }, consts.keyJWT, { expiresIn: consts.expiresJWT });
                delete user.password;
                return res.send({ ...user, token: token });
            }
        }

        return res.status(404).send({
            message: 'Wrong email or password'
        })
    })
}

exports.check_token = (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).send({ message: 'Token not found' });
    }
    jwt.verify(token, consts.keyJWT,
        (err, decoded) => {
            if (err || !decoded) {
                res.status(401)
                    .send({ message: 'Wrong token. Authentication error' });
            }
        });

    next();
}

exports.user_data = (req, res) => {
    const token = req.get('Authorization');
    jwt.verify(token, consts.keyJWT,
        (err, decoded) => {
            const id = decoded._id;
            UserModel.findById(id).lean().exec((err, user)=>{
                if (err || !user) {
                    return res.status(500).send({
                        message: 'Error when trying to fetch user dada',
                        error: err
                    });
                }

                // renovar o token
                let token = jwt.sign({ _id: user._id }, consts.keyJWT, { expiresIn: consts.expiresJWT });
                delete user.password;
                return res.send({ ...user, token: token });
            });
        });
}