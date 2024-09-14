const Persona = require('../../models/personas/persona');

const getAllPersonas = async (req, res) => {
  try {
    const personas = await Persona.find();
    res.status(200).json(personas);
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

const deletePersona = async (req, res) => {
  try {
    const persona = await Persona.findById(req.params.id);
    if (!persona) return res.status(404).json({ message: 'Persona not found' });
    
    await persona.remove(); // This will remove persona from sub-functionalities' permissions
    res.status(200).json({ message: 'Persona and its permissions deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPersonas,
  createPersona,
  deletePersona
};
