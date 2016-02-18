'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DivingSchema = new Schema({
	location: {
		province: String,
		place: String
	},
	info:{
		type: String,
		price: Number
	},
	sight: Number,
	sea_depth: Number,
	level: Number,
	season: String,	
	sea: String,
	age_limit: Number,
	activites: String,
	equipments_provide: [String],
	equipments_require: [String],
	prepration: String,
	skills_require: String,
	schedule: String,
	note: String,
	office_time: {
		open_time: String,
		close_time: String,
		note: String
	},
	image_gallery: Schema.Types.ObjectId
});

module.exports = mongoose.model('PackageDiving', DivingSchema ,'PackageDiving');
