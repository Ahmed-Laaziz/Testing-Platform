const SubFunctionality = require('../../models/personas/subFunctionality');
const Functionality = require('../../models/personas/functionality');
const Persona = require('../../models/personas/persona');
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

const createMultipleSubFunctionalities = async (req, res) => {
  try {
    const subFunctionalities = req.body.subFunctionalities;
    const savedSubFunctionalities = [];

    for (const subFunctionalityData of subFunctionalities) {
      const { name, functionalityName } = subFunctionalityData;

      // Find the functionality by its name
      const functionality = await Functionality.findOne({ name: functionalityName });

      if (!functionality) {
        return res.status(404).json({ message: `Functionality with name "${functionalityName}" not found.` });
      }

      // Create a new sub-functionality
      const newSubFunctionality = new SubFunctionality({
        name,
        release: "", // Empty release as per your request
        reference: "", // Empty reference as per your request
        functionality: functionality._id // Link to the functionality's ID
      });

      // Save the sub-functionality
      const savedSubFunctionality = await newSubFunctionality.save();
      savedSubFunctionalities.push(savedSubFunctionality);

      // Now update the corresponding functionality to add this sub-functionality
      await Functionality.findByIdAndUpdate(
        functionality._id,
        { $push: { subFunctionalities: savedSubFunctionality._id } }, // Push the sub-functionality ID into the array
        { new: true, useFindAndModify: false }
      );
    }

    res.status(201).json(savedSubFunctionalities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updatePermissions = async (req, res) => {
  try {
    const subFunctionality = await SubFunctionality.findById(req.params.id);
    if (!subFunctionality) return res.status(404).json({ message: 'Sub-Functionality not found' });

    const { persona, hasPermission, status } = req.body.permissions[0]; // Now also expect `status` in the request

    // Check if the permission for the persona already exists
    const existingPermission = subFunctionality.permissions.find(perm => perm.persona.toString() === persona);

    if (existingPermission) {
      // If the permission is already the same and status is unchanged, return a message
      if (existingPermission.hasPermission === hasPermission && existingPermission.status === status) {
        return res.status(200).json({ message: 'Permission and status are already set to these values.' });
      }
      
      // If the permission or status is different, update them
      existingPermission.hasPermission = hasPermission;
      existingPermission.status = status; // Update status
      await subFunctionality.save();
      return res.status(200).json({ message: 'Permission and status updated successfully.', subFunctionality });
    }

    // If no permission for this persona, add it to the list
    subFunctionality.permissions.push({ persona, hasPermission, status });
    await subFunctionality.save();

    return res.status(200).json({ message: 'Permission and status added successfully.', subFunctionality });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const addPermissionsToMultipleSubFunctionalities = async (req, res) => {
  try {
    const subFunctionalities = req.body.subFunctionalities;

    const updatedSubFunctionalities = [];

    // Loop through each subFunctionality in the request
    for (const subFunc of subFunctionalities) {
      const { subFunctionalityName, permissions } = subFunc;

      // Find the subFunctionality by name
      const subFunctionality = await SubFunctionality.findOne({ name: subFunctionalityName });

      if (!subFunctionality) {
        return res.status(404).json({ message: `SubFunctionality with name "${subFunctionalityName}" not found.` });
      }

      const updatedPermissions = [];

      // Loop through each permission for the current subFunctionality
      for (const permission of permissions) {
        const { personaName, hasPermission } = permission;

        // Find the persona by name
        const persona = await Persona.findOne({ name: personaName });

        if (!persona) {
          return res.status(404).json({ message: `Persona with name "${personaName}" not found.` });
        }

        // Add permission to the array
        updatedPermissions.push({
          persona: persona._id,
          hasPermission: hasPermission
        });
      }

      // Update the subFunctionality with the new permissions
      subFunctionality.permissions.push(...updatedPermissions);

      // Save the updated subFunctionality
      const updatedSubFunctionality = await subFunctionality.save();

      updatedSubFunctionalities.push(updatedSubFunctionality);
    }

    // Respond with all updated subfunctionalities
    res.status(200).json(updatedSubFunctionalities);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

const getSubFunctionalitiesWithPermissionsByFunctionalityName = async (req, res) => {
  try {
    const { functionalityName } = req.body;

    // Find the functionality by its name and populate the subFunctionalities
    const functionality = await Functionality.findOne({ name: functionalityName }).populate({
      path: 'subFunctionalities',
      populate: {
        path: 'permissions.persona', // Populate the persona field inside permissions
        select: 'name' // Select only the name of the persona
      }
    });

    if (!functionality) {
      return res.status(404).json({ message: `Functionality with name "${functionalityName}" not found.` });
    }

    // Extract and map the relevant subfunctionalities data
    const subFunctionalitiesWithPermissions = functionality.subFunctionalities.map(subFunc => ({
      name: subFunc.name,
      permissions: subFunc.permissions.map(permission => ({
        personaName: permission.persona.name,
        hasPermission: permission.hasPermission
      }))
    }));

    res.status(200).json(subFunctionalitiesWithPermissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPermissionsBySubFunctionalityName = async (req, res) => {
  try {
    const { subFunctionalityName } = req.body;

    // Find the sub-functionality by its name and populate the permissions' persona field
    const subFunctionality = await SubFunctionality.findOne({ name: subFunctionalityName }).populate({
      path: 'permissions.persona', // Populate the persona field inside permissions
      select: 'name' // Select only the persona's name
    });

    if (!subFunctionality) {
      return res.status(404).json({ message: `SubFunctionality with name "${subFunctionalityName}" not found.` });
    }

    // Map the permissions to extract persona names and permission values
    const permissionsWithPersonaNames = subFunctionality.permissions.map(permission => ({
      personaName: permission.persona.name,
      hasPermission: permission.hasPermission
    }));

    // Return the permissions with persona names
    res.status(200).json(permissionsWithPersonaNames);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





module.exports = {
  getAllSubFunctionalities,
  createSubFunctionality,
  updatePermissions,
  deleteSubFunctionality,
  getSubFunctionalityById,
  createMultipleSubFunctionalities,
  addPermissionsToMultipleSubFunctionalities,
  getSubFunctionalitiesWithPermissionsByFunctionalityName,
  getPermissionsBySubFunctionalityName
};
