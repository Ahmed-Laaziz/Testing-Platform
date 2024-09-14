const mongoose = require('mongoose');

const ProcessSchema = new mongoose.Schema({
  name: String,
  description: String,
  functionalities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Functionality' }]
});

// Cascade delete functionalities when a process is removed
ProcessSchema.pre('remove', async function (next) {
  await mongoose.model('Functionality').deleteMany({ _id: { $in: this.functionalities } });
  next();
});

module.exports = mongoose.model('Process', ProcessSchema);
