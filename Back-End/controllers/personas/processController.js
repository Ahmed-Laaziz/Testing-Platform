const Process = require('../../models/personas/process');
const Functionality = require('../../models/personas/functionality');
const SubFunctionality = require('../../models/personas/subFunctionality');

const getAllProcesses = async (req, res) => {
  try {
    const processes = await Process.find().populate('functionalities');
    res.status(200).json(processes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProcessById = async (req, res) => {
  try {
    const process = await Process.findById(req.params.id);
    if (!process) {
      return res.status(404).json({ message: 'Process not found' });
    }
    res.status(200).json(process);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProcessById = async (req, res) => {
  try {
    const updatedProcess = await Process.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return the updated persona, and ensure validation is run
    );

    if (!updatedProcess) {
      return res.status(404).json({ message: 'Process not found' });
    }

    res.status(200).json(updatedProcess);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createProcess = async (req, res) => {
  try {
    const process = new Process(req.body);
    await process.save();
    res.status(201).json(process);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProcess = async (req, res) => {
  try {
    // Find the process by ID
    const process = await Process.findById(req.params.id);
    if (!process) {
      return res.status(404).json({ message: 'Process not found' });
    }

    // Find and delete all functionalities related to this process
    await Functionality.deleteMany({ process: process._id });

    // Optionally, if you want to cascade delete sub-functionalities as well:
    await SubFunctionality.deleteMany({ process: process._id });

    // Now delete the process itself
    await Process.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Process and its related data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllProcesses,
  createProcess,
  deleteProcess,
  getProcessById,
  updateProcessById
};
