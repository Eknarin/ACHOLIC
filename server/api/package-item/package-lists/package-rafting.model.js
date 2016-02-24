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
	info:[{
		type: {type: String},
		boat_type: String,
		people: String,
		distance: String,
		price: String,
		duration: String
	}],
	river_width: Number,
	river_depth: Number,
	level: String,
	views: String,
	stages: [String],
	stage_type: [String],
	season: String,
	start_location: String,
	end_location: String,
	age_limit: Number,
	activites: String,
	equipments_provide: [String],
	equipments_require: [String],
	prepration: String,
	skills_require: [String],
	image_gallery: Schema.Types.ObjectId
});

module.exports = mongoose.model('PackageRafting', RaftingSchema ,'PackageRafting');
