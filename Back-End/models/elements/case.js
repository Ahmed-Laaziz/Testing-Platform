// agent.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const caseSchema = new Schema({
    type: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    identifier: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false
    },
    typification: {
        type: String,
        required: false
    },
    case_origin: {
        type: String,
        required: false
    },
    entry_door: {
        type: String,
        required: false,
    },
    channel: {
        type: String,
        required: false
    },
    subChannel: {
        type: String,
        required: false
    },
    relapse: {
        type: Boolean,
        required: false,
        default: false 
    },
    insistence: {
        type: Boolean,
        required: false,
        default: false 
    },
    created_by: {
        type: String,
        required: false
    },
    branch: {
        type: String
    }
}
, {timestamps: true})
;

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;