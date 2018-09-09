const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0},
    _user: { type: Schema.Types.ObjectId, ref: 'User'}, //sets up a relationship between this model and another one - user model
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);

