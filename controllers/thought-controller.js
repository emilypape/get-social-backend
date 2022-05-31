const { Thought, User } = require('../models');

const thoughtController = {
  // functions go here as methods
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
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
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: 'no thought found with this id' });
          return;
        }
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  addThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate({ username: body.username }, { $push: { thoughts: _id } }, { new: true });
      })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(data);
      })
      .catch((err) => res.json(err));
  },
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        return User.findOneAndUpdate({ username: body.username }, { $push: { thoughts: _id } }, { new: true });
      })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        return User.findOneAndUpdate(
          { username: body.username },
          { $pull: { thoughts: params.thoughtId } },
          { new: true },
        );
      })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(data);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
