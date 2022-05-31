const { User, Thought } = require('../models');
const { db } = require('../models/User');

const userController = {
  // functions go here as methods
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .select('-__v')
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: 'no user found with this id' });
          return;
        }
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createUser({ body }, res) {
    User.create(body)
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json(err));
  },
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ id: params.id }, body, { new: true })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: 'no user found with this id' });
          return;
        }
        res.json(data);
      })
      .catch((err) => res.status(400).json(err));
  },
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: 'no user found with this id' });
          return;
        }
        res.json(data);
      })
      .catch((err) => res.status(400).json(err));
  },
  addFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId } }, { new: true })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  deleteFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.userId }, { $pull: { friends: params.friendId } }, { new: true })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
