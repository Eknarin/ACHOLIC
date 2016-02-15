'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrailRunSchema = new Schema({
  	location: String,
	user_id: Schema.Types.ObjectId,
	info:{
		type: String,
		price: Number,
		distance: Number
	},
	detail:{
		salogan: String,
		gift: String,
		purpose: String,
		prize: String
	}
	equipments_provide: [String],
	equipments_require: [String],
	prepration: String,
	skills_require: String,
	schedule: String,
	activity_time: {
		open_time: String,
		close_time: String,
		note: String
	},
	register_time: {
		open_time: String,
		close_time: String,
		note: String
	},
	image_gallery: Schema.Types.ObjectId
});

module.exports = mongoose.model('PackageTrailRun', TrailRunSchema);
