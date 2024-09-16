const mongoose = require('mongoose');

const FunctionalitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  process: { type: mongoose.Schema.Types.ObjectId, ref: 'Process' },
  subFunctionalities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubFunctionality' }]
});

// Cascade delete sub-functionalities when a functionality is removed
FunctionalitySchema.pre('remove', async function (next) {
  await mongoose.model('SubFunctionality').deleteMany({ _id: { $in: this.subFunctionalities } });
  next();
});

module.exports = mongoose.model('Functionality', FunctionalitySchema);
