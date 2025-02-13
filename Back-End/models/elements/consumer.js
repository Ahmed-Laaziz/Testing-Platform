// agent.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consumersSchema = new Schema({
    type: {
        type: String,
        required: true,
        unique: false
    },
    nic: {
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

const Consumer = mongoose.model('Consumer', consumersSchema);

module.exports = Consumer;