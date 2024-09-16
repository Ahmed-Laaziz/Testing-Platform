const Functionality = require('../../models/personas/functionality');
const SubFunctionality = require('../../models/personas/subFunctionality');
const Process = require('../../models/personas/process');

const getAllFunctionalities = async (req, res) => {
  try {
    const functionalities = await Functionality.find().populate('subFunctionalities');
    res.status(200).json(functionalities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFunctionality = async (req, res) => {
  try {
    const functionality = new Functionality(req.body);
    // Save the functionality to the database
    const savedFunctionality = await functionality.save();

    // Now update the Process document to add this functionality
    await Process.findByIdAndUpdate(
      req.body.process, // Find the process by its ID
      { $push: { functionalities: savedFunctionality._id } }, // Push the new functionality's ID to the array
      { new: true, useFindAndModify: false } // Return the updated document
    );
    res.status(201).json(functionality);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFunctionality = async (req, res) => {
  try {
    // Find the functionality by ID
    const functionality = await Functionality.findById(req.params.id);
    if (!functionality) {
      return res.status(404).json({ message: 'Functionality not found' });
    }

    // Delete all related sub-functionalities
    await SubFunctionality.deleteMany({ functionality: functionality._id });

    // Now delete the functionality itself
    await Functionality.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Functionality and its related sub-functionalities deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFunctionalityById = async (req, res) => {
  try {
    const functionality = await Functionality.findById(req.params.id);
    if (!functionality) {
      return res.status(404).json({ message: 'Functionality not found' });
    }
    res.status(200).json(functionality);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllFunctionalities,
  createFunctionality,
  deleteFunctionality,
  getFunctionalityById
};
