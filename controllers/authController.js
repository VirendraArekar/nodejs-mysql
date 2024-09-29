const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// User Login
exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, user) => {
        if (err || !user.length) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const validPassword = bcrypt.compareSync(password, user[0].password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    });
};

// User Registration
exports.register = (req, res) => {
    const newUser = req.body;
    User.create(newUser, (err) => {
        if (err) throw err;
        res.status(201).json({ message: 'User registered successfully' });
    });
};
