const Images = require('../models/images');
const Tutorial = require('../models/tutorial');

const createTutorial = async (req, res) => {
  try {
    const docTutorial = await Tutorial.create(req.body);
    res.status(201).json({
      message: "Tutorial created successfully",
      data: docTutorial
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed to create tutorial",
      error: error.message
    });
  }
};

const createImage = async (tutorialId, image) => {
  try {
    const docImage = await Images.create(image);
    console.log("\n>> Created Image:\n", docImage);
    const updatedTutorial = await Tutorial.findByIdAndUpdate(
      tutorialId,
      {
        $push: {
          images: {
            _id: docImage._id,
            url: docImage.url,
            caption: docImage.caption
          }
        }
      },
      { new: true, useFindAndModify: false }
    );

    if (!updatedTutorial) {
      throw new Error("Tutorial not found");
    }

    return updatedTutorial;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


module.exports = {createTutorial,createImage}