// User Controllers
const { User } = require('../models');
const Thought = require('../models/Thought');
const { db } = require('../models/User');

const userController = {
    // User methods
    // Get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: ('-__v -username')
            })
            .populate({
                path: 'friends',
                select: ('-__v -thoughts')
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // Get one user by id
    getUserById({ params },res) {
        User.findOne({ _id: params.userId })
        .populate({
            path: 'thoughts',
            select: ('-__v -username')
        })
        .populate({
            path: 'friends',
            select: ('-__v -thoughts')
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
    },
    // Create a new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    // Updata a user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    // Delete a user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                return dbUserData;
            })
            .then(dbUserData => {
                User.updateMany(
                    { _id: { $in: dbUserData.friends } },
                    { $pull: { friends: params.userId } }
                )
                .then(()=> {
                    Thought.deleteMany({ username: dbUserData.username })
                    .then(() => {
                        res.json({message: 'Successfully deleted user'});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).json(err);
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json(err);
                })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    // Create a friend by id
    createFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.'});
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    // Delete a friend by id
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            {new: true}
        )
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    }
};

module.exports = userController;