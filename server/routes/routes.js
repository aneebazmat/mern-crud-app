const mongoose = require('mongoose');
const userModel = require('../model/users.js');

const handleCreateUser = (req, res) => {
    const { name, email, age } = req.body;
    userModel.create({ name, email, age })
        .then(user => res.status(201).json(user))
        .catch(err => res.status(400).json({ error: err.message }));
};

const handleGetUsers = (req, res) => {
    userModel.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json({ error: err.message }));
};

const handleGetUserById = (req, res) => {
    const { id } = req.params;

    userModel.findById(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(200).json(user);
        })
        .catch(err => res.status(400).json({ error: err.message }));
};

const handleUpdateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    userModel.findByIdAndUpdate(id, { name, email, age }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(200).json(user);
        })
        .catch(err => res.status(400).json({ error: err.message }));
};

const handleDeleteUser = (req, res) => {
    const { id } = req.params;

    userModel.findByIdAndDelete(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(200).json({ message: "User deleted successfully" });
        })
        .catch(err => res.status(400).json({ error: err.message }));
};

module.exports = { handleCreateUser, handleGetUsers, handleGetUserById, handleUpdateUser, handleDeleteUser };