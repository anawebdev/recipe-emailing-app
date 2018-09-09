const mongoose = require('mongoose');
const { Schema } = mongoose;

// subschema

const recipientSchema = new Schema({
    email: String,
    responded: {type: Boolean, default: false},
});

mongoose.exports = recipientSchema;

