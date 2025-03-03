// agent.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billingsSchema = new Schema({
    type: {
        type: String,
        required: true,
        unique: false
    },
    number: {
        type: String,
        required: true
    },
    status: {
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

const Billing = mongoose.model('Billing', billingsSchema);

module.exports = Billing;