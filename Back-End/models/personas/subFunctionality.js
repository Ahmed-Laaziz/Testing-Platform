const mongoose = require('mongoose');

const SubFunctionalitySchema = new mongoose.Schema({
  name: String,
  release: String,
  reference: String,
  functionality: { type: mongoose.Schema.Types.ObjectId, ref: 'Functionality' },
  permissions: [{
    persona: { type: mongoose.Schema.Types.ObjectId, ref: 'Persona' },
    hasPermission: Boolean
  }]
});

module.exports = mongoose.model('SubFunctionality', SubFunctionalitySchema);
