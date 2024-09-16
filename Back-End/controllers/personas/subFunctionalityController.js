const SubFunctionality = require('../../models/personas/subFunctionality');
const Functionality = require('../../models/personas/functionality');
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
    // Save the new sub-functionality to the database
    const savedSubFunctionality = await subFunctionality.save();

    // Now update the corresponding functionality to add this sub-functionality
    await Functionality.findByIdAndUpdate(
      req.body.functionality,
      { $push: { subFunctionalities: savedSubFunctionality._id } }, // Push the sub-functionality id into the array
      { new: true, useFindAndModify: false }
    );
    res.status(201).json(subFunctionality);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePermissions = async (req, res) => {
  try {
    const subFunctionality = await SubFunctionality.findById(req.params.id);
    if (!subFunctionality) return res.status(404).json({ message: 'Sub-Functionality not found' });

    const { persona, hasPermission } = req.body.permissions[0]; // Expecting an array with one object

    // Check if the permission for the persona already exists
    const existingPermission = subFunctionality.permissions.find(perm => perm.persona.toString() === persona);

    if (existingPermission) {
      // If the permission is already the same, return a message
      if (existingPermission.hasPermission === hasPermission) {
        return res.status(200).json({ message: 'Permission is already set to this value.' });
      } 
      
      // If the permission is different, update it
      existingPermission.hasPermission = hasPermission;
      await subFunctionality.save();
      return res.status(200).json({ message: 'Permission updated successfully.', subFunctionality });
    } 

    // If no permission for this persona, add it to the list
    subFunctionality.permissions.push({ persona, hasPermission });
    await subFunctionality.save();

    return res.status(200).json({ message: 'Permission added successfully.', subFunctionality });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const deleteSubFunctionality = async (req, res) => {
  try {
    // Find and delete the sub-functionality by ID
    const subFunctionality = await SubFunctionality.findById(req.params.id);
    if (!subFunctionality) {
      return res.status(404).json({ message: 'Sub-Functionality not found' });
    }

    await SubFunctionality.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Sub-Functionality deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubFunctionalityById = async (req, res) => {
  try {
    // Find the sub-functionality by ID and populate the permissions' persona
    const subFunctionality = await SubFunctionality.findById(req.params.id).populate('permissions.persona');
    res.status(200).json(subFunctionality);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sub-functionality', error });
  }
};


module.exports = {
  getAllSubFunctionalities,
  createSubFunctionality,
  updatePermissions,
  deleteSubFunctionality,
  getSubFunctionalityById
};
