// agent.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const caseSchema = new Schema({
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
    status_reason: {
        type: String,
        required: false
    },
    brand: {
        type: String,
        required: false
    },
    inflight: {
        type: Boolean,
        required: false,
        default: false 
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

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;