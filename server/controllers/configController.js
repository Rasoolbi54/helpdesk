const Config = require('../models/configModel');

// Get current config (Admin only)
exports.getConfig = async (req, res) => {
  try {
    const config = await Config.findOne();
    if (!config) {
      return res.status(404).json({ message: "Config not found" });
    }
    res.status(200).json(config);
  } catch (error) {
    console.error("Get Config Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update config (Admin only)
exports.updateConfig = async (req, res) => {
  try {
    const { autoCloseTickets, confidenceThreshold } = req.body;

    let config = await Config.findOne();
    if (!config) {
      config = new Config({ autoCloseTickets, confidenceThreshold });
    } else {
      if (autoCloseTickets !== undefined) config.autoCloseTickets = autoCloseTickets;
      if (confidenceThreshold !== undefined) config.confidenceThreshold = confidenceThreshold;
    }

    await config.save();
    res.status(200).json({ message: "Config updated", config });
  } catch (error) {
    console.error("Update Config Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
