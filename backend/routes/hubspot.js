const express = require("express");
const router = express.Router();
const axios = require("axios");

// POST /create-hubspot-fields
router.post("/", async (req, res) => {
  const { cluster, topics } = req.body;
  if (!cluster || !topics) {
    return res.status(400).json({ error: "Missing cluster or topics" });
  }

  // Simulate HubSpot property creation
  try {
    // Normally, you would use axios to call HubSpot API here
    // For demo, just mock success
    const fields = [
      `${cluster}_Surge_Score`,
      `${cluster}_Topic_Count`,
      `${cluster}_Last_Surge_Date`,
    ];
    res.json({ success: true, fields });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
