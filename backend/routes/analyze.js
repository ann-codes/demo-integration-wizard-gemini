const express = require('express');
const router = express.Router();
const { analyzeProductDescription } = require('../utils/gemini');

// POST /analyze
router.post('/', async (req, res) => {
  const { product_description } = req.body;
  if (!product_description) {
    return res.status(400).json({ error: 'Missing product_description' });
  }

  try {
    const topics = await analyzeProductDescription(product_description);
    res.json({ topics });
  } catch (error) {
    console.error('Error in analyze endpoint:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
