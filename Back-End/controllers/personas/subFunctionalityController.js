const SubFunctionality = require('../../models/personas/subFunctionality');

const getAllSubFunctionalities = async (req, res) => {
  try {
    const subFunctionalities = await SubFunctionality.find();
    res.status(200).json(subFunctionalities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSubFunctionality = async (req, res) => {
  try {
    const subFunctionality = new SubFunctionality(req.body);
    await subFunctionality.save();
    res.status(201).json(subFunctionality);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePermissions = async (req, res) => {
  try {
    const subFunctionality = await SubFunctionality.findById(req.params.id);
    if (!subFunctionality) return res.status(404).json({ message: 'Sub-Functionality not found' });
    
    // Update permissions
    subFunctionality.permissions = req.body.permissions;
    await subFunctionality.save();
    
    res.status(200).json(subFunctionality);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSubFunctionalities,
  createSubFunctionality,
  updatePermissions
};
