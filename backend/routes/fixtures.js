const express = require('express');
const router = express.Router();
const {
  getFilteredFixtures,
  getFixtureById,
  getRandomFixtures,
} = require('../controllers/fixtureController');

router.get('/random', getRandomFixtures); // GET /api/fixtures/random
router.get('/', getFilteredFixtures);     // GET /api/fixtures?date=...
router.get('/:id', getFixtureById);       // GET /api/fixtures/12345

module.exports = router;
