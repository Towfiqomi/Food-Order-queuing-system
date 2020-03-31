const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const {toppingSchema} = require('./Topping');

const sandwichSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    toppings: [ toppingSchema ],
    breadType: {
        type: String,
        enum: ['oat', 'rye', 'wheat'],
        default: 'oat',
        required: true
    },
    sandwich_id: {
        type: Number
    }
});

sandwichSchema.plugin(AutoIncrement, {order_id:'sandwich_id_seq', inc_field: 'sandwich_id'});

const Sandwich = mongoose.model('Sandwich', sandwichSchema);

exports.sandwichSchema = sandwichSchema;
exports.Sandwich = Sandwich;