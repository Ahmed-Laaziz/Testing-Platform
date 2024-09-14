const Functionality = require('../../models/personas/functionality');

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
    await functionality.save();
    res.status(201).json(functionality);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFunctionality = async (req, res) => {
  try {
    const functionality = await Functionality.findById(req.params.id);
    if (!functionality) return res.status(404).json({ message: 'Functionality not found' });
    await functionality.remove(); // Cascade delete will be triggered here
    res.status(200).json({ message: 'Functionality and its sub-functionalities deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllFunctionalities,
  createFunctionality,
  deleteFunctionality
};
