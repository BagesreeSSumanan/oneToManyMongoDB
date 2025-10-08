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

const DeleteTutorial = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTutorial = await Tutorial.findByIdAndDelete(id, { useFindAndModify: false });

    if (!deletedTutorial) {
      return res.status(404).json({ msg: "Tutorial not found" });
    }

    if (deletedTutorial.images && deletedTutorial.images.length > 0) {
      const imageIds = deletedTutorial.images.map(img => img._id);
      await Images.deleteMany({ _id: { $in: imageIds } });
    }

    res.status(200).json({
      msg: "Tutorial and associated images deleted successfully",
      data: deletedTutorial
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
};


module.exports = {createTutorial,createImage,DeleteTutorial}