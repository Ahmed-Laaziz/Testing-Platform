const Consumer = require('../../models/elements/consumer'); // Import the Consumer model

// Create an consumer (POST /Consumer)
exports.createConsumer = async (req, res) => {
    try {
        const newConsumer = new Consumer(req.body);
        const savedConsumer = await newConsumer.save();
        res.status(201).json(savedConsumer);
    } catch (error) {
        console.error('Error creating consumer:', error);
        res.status(500).json({ error: 'Failed to create consumer' });
    }
};

// Get all Consumer (GET /Consumer)
exports.getAllConsumer = async (req, res) => {
    try {
        const consumer = await Consumer.find();
        res.status(200).json(consumer);
    } catch (error) {
        console.error('Error retrieving Consumer:', error);
        res.status(500).json({ error: 'Failed to retrieve Consumer' });
    }
};

// Get consumer by ID (GET /Consumer/:id)
exports.getConsumerById = async (req, res) => {
    try {
        const consumer = await Consumer.findById(req.params.id);
        if (!consumer) {
            return res.status(404).json({ error: 'Consumer not found' });
        }
        res.status(200).json(consumer);
    } catch (error) {
        console.error('Error retrieving consumers:', error);
        res.status(500).json({ error: 'Failed to retrieve consumers' });
    }
};

exports.getConsumersByBranch = async (req, res) => {
    try {
        const { branch } = req.params;
        const consumers = await Consumer.find({ branch });

        if (consumers.length === 0) {
            return res.status(404).json({ error: 'No consumers found for this branch' });
        }

        res.status(200).json(consumers);
    } catch (error) {
        console.error('Error retrieving consumers by branch:', error);
        res.status(500).json({ error: 'Failed to retrieve consumers by branch' });
    }
};

// Update consumer by ID (PUT /Consumer/:id)
exports.updateConsumer = async (req, res) => {
    try {
        const updatedConsumer = await Consumer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedConsumer) {
            return res.status(404).json({ error: 'Consumer not found' });
        }
        res.status(200).json(updatedConsumer);
    } catch (error) {
        console.error('Error updating consumer:', error);
        res.status(500).json({ error: 'Failed to update consumer' });
    }
};

// Delete consumer by ID (DELETE /Consumer/:id)
exports.deleteConsumer = async (req, res) => {
    try {
        const deletedConsumer = await Consumer.findByIdAndDelete(req.params.id);
        if (!deletedConsumer) {
            return res.status(404).json({ error: 'Consumer not found' });
        }
        res.status(200).json({ message: 'Consumer deleted successfully' });
    } catch (error) {
        console.error('Error deleting consumer:', error);
        res.status(500).json({ error: 'Failed to delete consumer' });
    }
};

// Get count of all Consumer (GET /Consumer/count)
exports.getConsumerCount = async (req, res) => {
    try {
        const consumerCount = await Consumer.countDocuments(); // Get the count of all Consumer
        res.status(200).json({ count: consumerCount });
    } catch (error) {
        console.error('Error retrieving consumer count:', error);
        res.status(500).json({ error: 'Failed to retrieve consumer count' });
    }
};

// Get count of consumers by branch (GET /consumers/count/:branch)
exports.getConsumerCountByBranch = async (req, res) => {
    try {
        const { branch } = req.params; // Extract branch from URL params

        if (!branch) {
            return res.status(400).json({ error: "Branch parameter is required" });
        }

        const consumerCount = await Consumer.countDocuments({ branch }); // Count consumers for the given branch
        res.status(200).json({ branch, count: consumerCount });
    } catch (error) {
        console.error('Error retrieving consumer count by branch:', error);
        res.status(500).json({ error: 'Failed to retrieve consumer count' });
    }
};