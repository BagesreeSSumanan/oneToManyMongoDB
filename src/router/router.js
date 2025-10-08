const express = require('express');
const router = express.Router();
const {createImage,createTutorial}= require('../controller/controller');

router.post("/createImage", async (req, res) => {
  const { tutorialId, url, caption } = req.body;

  if (!tutorialId || !url) {
    return res.status(400).json({ error: "tutorialId and url are required" });
  }

  try {
    const image = { url, caption };
    const updatedTutorial = await createImage(tutorialId, image);

    res.status(200).json({
      message: "Image added successfully",
      tutorial: updatedTutorial
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to add image" });
  }
});
router.post("/createTutorial", createTutorial);
module.exports = router;
