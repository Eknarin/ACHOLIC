'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RaftingSchema = new Schema({
	location: {
		location_text: String,
		lat: String,
		long: String
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
	stages_amount: Number,
	stages: [{
		name: String,
		description: String
	}],
	season:{
		year: String,
		month1: String,
		month2: String
	},	
	age_limit: Number,
	activities: [String],
	equipments_provide: [String],
	equipments_require: [String],
	prepration: String,
	skills_require: [String],
	image_gallery: { type: Schema.Types.ObjectId, ref: 'PackageGallery' }
});

module.exports = mongoose.model('PackageRafting', RaftingSchema ,'PackageRafting');
