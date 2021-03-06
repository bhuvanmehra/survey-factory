const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema], //Array of RecipientSchema. Sub Document Collection
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }, // sets up relation between 2 models
  dateSent: Date,
  lastResponded: Date
});

//Create model('name of Model', Schema)
mongoose.model('surveys', surveySchema);
