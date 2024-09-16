const Persona = require('../../models/personas/persona');
const SubFunctionality = require('../../models/personas/subFunctionality');

const getAllPersonas = async (req, res) => {
  try {
    const personas = await Persona.find();
    res.status(200).json(personas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPersonaById = async (req, res) => {
  try {
    const persona = await Persona.findById(req.params.id);
    if (!persona) {
      return res.status(404).json({ message: 'Persona not found' });
    }
    res.status(200).json(persona);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPersona = async (req, res) => {
  try {
    const persona = new Persona(req.body);
    await persona.save();
    res.status(201).json(persona);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePersonaById = async (req, res) => {
  try {
    const updatedPersona = await Persona.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return the updated persona, and ensure validation is run
    );

    if (!updatedPersona) {
      return res.status(404).json({ message: 'Persona not found' });
    }

    res.status(200).json(updatedPersona);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePersona = async (req, res) => {
  try {
    // Find the persona by ID
    const persona = await Persona.findById(req.params.id);
    if (!persona) {
      return res.status(404).json({ message: 'Persona not found' });
    }

    // Optionally remove any references in SubFunctionalities where this persona had permissions
    await SubFunctionality.updateMany(
      {}, // Match all sub-functionalities
      { $pull: { permissions: { persona: persona._id } } } // Remove the persona from permissions
    );

    // Now delete the persona itself
    await Persona.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Persona and its related permissions deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllPersonas,
  createPersona,
  deletePersona,
  getPersonaById,
  updatePersonaById
};
