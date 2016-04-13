'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DivingSchema = new Schema({
	location: {
		location_text: String,
		lat: String,
		long: String
	},
	diving_place: String,
	info:[{
		type: {type: String},
		diving_type: String,
		people: String,
		distance: String,
		price: String,
		duration: String
	}],
	level: String,
	sight: Number,
	depth: Number,
	expired: Number,
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
	image_gallery: { type: Schema.Types.ObjectId, ref: 'PackageGallery' },
	diving_side: String
});

module.exports = mongoose.model('PackageDiving', DivingSchema ,'PackageDiving');
