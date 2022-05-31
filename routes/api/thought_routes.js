const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  addThought,
  removeThought,
  updateThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts).get(getThoughtById).post(addThought);
router.route('/:thoughtId').delete(removeThought).put(updateThought);

module.exports = router;
