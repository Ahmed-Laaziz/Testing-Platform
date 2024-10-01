// agent.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ciSchema = new Schema({
    type: {
        type: String,
        required: true,
        unique: true
    },
    identifier: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false
    },
    interaction_type: {
        type: String,
        required: false
    },
    entry_door: {
        type: String,
        required: false
    },
    created_by: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true
    }
}
, {timestamps: true})
;

const Ci = mongoose.model('Ci', ciSchema);

module.exports = Ci;