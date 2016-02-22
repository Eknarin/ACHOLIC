'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RaftingSchema = new Schema({
	location: {
		province: String,
		place: String
	},
	river_line: String,
	boat: String,
	info:{
		type: String,
		boat_type: String,
		people: Number,
		distance: String,
		price: Number,
		duration: String
	},
	river_width: Number,
	river_depth: Number,
	level: Number,
	views: String,
	stages: [String],
	stage_type: String,
	season: String,
	start_location: String,
	end_location: String,
	age_limit: Number,
	activites: String,
	equipments_provide: [String],
	equipments_require: [String],
	prepration: String,
	skills_require: String,
	image_gallery: Schema.Types.ObjectId
});

module.exports = mongoose.model('PackageRafting', RaftingSchema ,'PackageRafting');
