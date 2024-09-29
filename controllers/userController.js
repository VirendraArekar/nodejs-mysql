const User = require('../models/userModel');

// Get all users
exports.getAllUsers = (req, res) => {
    User.getAll((err, data) => {
        if (err) throw err;
        res.json(data);
    });
};

// Get user by ID
exports.getUserById = (req, res) => {
    const userId = req.params.id;
    User.getById(userId, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
};

// Create a new user (requires authentication)
exports.createUser = (req, res) => {
    const newUser = req.body;
    User.create(newUser, (err) => {
        if (err) throw err;
        res.status(201).json({ message: 'User created successfully' });
    });
};

// Update an existing user (requires authentication)
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
    User.update(userId, updatedData, (err) => {
        if (err) throw err;
        res.json({ message: 'User updated successfully' });
    });
};

// Delete a user (requires authentication)
exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    User.delete(userId, (err) => {
        if (err) throw err;
        res.json({ message: 'User deleted successfully' });
    });
};
