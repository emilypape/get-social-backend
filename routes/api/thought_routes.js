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

router.route('/').get(getAllThoughts).post(addThought);
router.route('/:thoughtId').get(getThoughtById).delete(removeThought).put(updateThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
