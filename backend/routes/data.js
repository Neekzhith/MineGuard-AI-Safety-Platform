
const express = require('express');
const Record = require('../models/Record');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.post('/save', authenticate, async (req, res) => {
  try {
    const { type, payload, notes } = req.body;

    const record = await Record.create({
      userId: req.user.id,
      type: type || 'sensor',
      payload: payload || {},
      notes,
    });

    res.status(201).json(record);
  } catch (error) {
    console.error('Save record error:', error);
    res.status(500).json({ message: 'Failed to save record.' });
  }
});

router.get('/all', authenticate, async (req, res) => {
  try {
    const records = await Record.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    console.error('Fetch records error:', error);
    res.status(500).json({ message: 'Failed to fetch records.' });
  }
});

module.exports = router;
