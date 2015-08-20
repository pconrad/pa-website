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
  { descriptor : utils.getSampleQuizDescriptor("Second Fixture Example Quiz") },
  { descriptor : utils.getSampleQuizDescriptor("Third Fixture Example Quiz") }
];



module.exports.loadAllFixtures = function(models) {
  for (var i = 0; quizDescriptorFixtures.length > i; i++) {
      models.QuizDescriptor.create(quizDescriptorFixtures[i]);
  }
}

















