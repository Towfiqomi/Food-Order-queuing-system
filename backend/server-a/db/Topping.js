const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const toppingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    order_id: {
        type: Number
    }
});
//
// toppingSchema.plugin(AutoIncrement, {id:'topping_id_seq', inc_field: 'id'});
const Topping = mongoose.model('Topping', toppingSchema);

exports.toppingSchema = toppingSchema;
exports.Topping = Topping;