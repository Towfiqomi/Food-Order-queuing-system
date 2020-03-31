const Joi = require('joi');
const mongoose = require('mongoose');
// const {Sandwich} = require('./Sandwich').Sandwich;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new mongoose.Schema({
    sandwichId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sandwich",
        // type: Number,
        // required: true
    },
    status: {
        type: String,
        enum: ['received', 'inQueue', 'ready', 'failed'],
        default: 'received',
        required: true
    },
    order_id:{
        type: Number,
    }
});
orderSchema.plugin(AutoIncrement, {order_id:'order_id_seq', inc_field: 'order_id'});
const Order = mongoose.model('Order', orderSchema);

exports.orderSchema = orderSchema;
exports.Order = Order;