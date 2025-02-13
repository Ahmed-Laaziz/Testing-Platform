// agent.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    type: {
        type: String,
        required: true,
        unique: false
    },
    identifier: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false
    },
    fulfillment_status: {
        type: String,
        required: false
    },
    status_reason: {
        type: String,
        required: false
    },
    owner: {
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

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;