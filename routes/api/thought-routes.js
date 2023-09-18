// Thought API Routes
// Dependencies
// Express
const router = require('express').Router();
// Thought Controllers
const { getAllThoughts, createThought, getThoughtById, updateThought, deleteThought, createReaction, deleteReaction } = require('../../controllers/thought-controllers');

// GET all thoughts and POST a new thought /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// GET one thought, PUT update a thought by id, and DELETE a thought by id at /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// POST a reaction to a thought at /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(createReaction);

// DELETE a reaction to a thought at /api/thoughts/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);


module.exports = router;