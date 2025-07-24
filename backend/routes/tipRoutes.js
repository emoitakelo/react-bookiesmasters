const express = require('express');
const router = express.Router();
const { requestTips } = require('../controllers/tipController');
const authMiddleware = require('../middleware/auth');

// POST /api/tips/request — Protected Route
router.post('/request', authMiddleware, requestTips);

module.exports = router;
