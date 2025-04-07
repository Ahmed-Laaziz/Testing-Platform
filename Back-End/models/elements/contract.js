// agent.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contractSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    identifier: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    }
}
, {timestamps: true})
;

const Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;