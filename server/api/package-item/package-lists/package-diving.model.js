'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DivingSchema = new Schema({
	location: String,
	river_line: String,
	info:{
		type: String,
		boat_type: String,
		people: Number,
		distance: String,
		price: Number
	},
	river_width: Number,
	river_depth: Number,
	level: Number,
	views: String,
	stages: [String],
	stage_type: String,
	end_location: String,
	age_limit: Number,
	activites: String,
	equipments_provide: [String],
	equipments_require: [String],
	prepration: String,
	skills_require: String,
	office_time: {
		open_time: String,
		close_time: String,
		note: String
	},
	image_gallery: Schema.Types.ObjectId
});

module.exports = mongoose.model('PackageDiving', DivingSchema);
