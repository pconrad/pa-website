var models = require('../models');
var utils = require('../test/utils');

var quizDescriptorFixtures = [

  { descriptor : {
    "version" : "0.1",
    "title" : "Number Conversions",
    "quiz": [
    	{
		    "question": "binHexOctDec",
		    "repeat": 2,
	},
    	{
		    "question": "changeOfBase",
		    "repeat": 2,
	}
	]
      }
  },

  { descriptor : {
    "version" : "0.1",
    "title" : "Binary <-> Hex",
    "quiz": [
    	{
		    "question": "binHexOctDec",
		    "repeat": 4,
		    "parameters": {
			"conversions" : [
			    {"fromRad": 2, "toRad": 16, 
			     "minVal": 0, "maxVal": 65535},
			    {"fromRad": 16, "toRad": 2, 
			     "minVal": 0, "maxVal": 65535}
			]
		    }
	}
	]
      }
  }

];



module.exports.loadAllFixtures = function(models) {
  for (var i = 0; quizDescriptorFixtures.length > i; i++) {
      models.QuizDescriptor.create(quizDescriptorFixtures[i]);
  }
}

















