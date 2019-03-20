var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bikesSchema = new Schema({
  _id:   mongoose.Schema.Types.ObjectId,
  tripduration: { type: Number, Required: true },
  starttime:    { type: Date,     Required: true},
  stoptime:    { type: Date,     Required: true},

  startStationID: {type: Number, Required: true},
  startStationName: {type: String, Required: true},
  startStationLongitude: {type: Number, Required: true},
  startStationLatitude: {type: Number, Required: true},

  endStationID: {type: Number, Required: true},
  endStationName: {type: String, Required: true},
  endStationLongitude: {type: Number, Required: true},
  endStationLatitude: {type: Number, Required: true},

  bikeID: {type: Number, Required: true},
  userType: {type: String, Required: true},
  birthYear: {type: String, Required: false},
  gender: {type: Number, Required: true}
});
module.exports = mongoose.model('Bikes', bikesSchema);
