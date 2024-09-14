const Process = require('../../models/personas/process');

const getAllProcesses = async (req, res) => {
  try {
    const processes = await Process.find().populate('functionalities');
    res.status(200).json(processes);
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
    const process = await Process.findById(req.params.id);
    if (!process) return res.status(404).json({ message: 'Process not found' });
    await process.remove(); // Cascade delete will be triggered here
    res.status(200).json({ message: 'Process and its dependencies deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProcesses,
  createProcess,
  deleteProcess
};
