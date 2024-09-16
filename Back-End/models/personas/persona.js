const mongoose = require('mongoose');

const PersonaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String
});

// Remove persona references from permissions when a persona is deleted
PersonaSchema.pre('remove', async function (next) {
  await mongoose.model('SubFunctionality').updateMany(
    { 'permissions.persona': this._id },
    { $pull: { permissions: { persona: this._id } } }
  );
  next();
});

module.exports = mongoose.model('Persona', PersonaSchema);
