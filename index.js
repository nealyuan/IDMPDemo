var express = require('express');
var app = express();
var fs = require ('fs');

//configuration needed for using EJS
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use('/public', express.static(__dirname + '/public')); //public contains the style sheets
  app.use(express.json());
  app.use(express.urlencoded());
});

//Routes
app.get('/', function(req, res) {  
	fs.readFile ('fileUsage.csv', function (err, data){
		if (err) throw err;
		//data is buffer, therefore convert to String
		var text = data.toString();
		//Break up file into lines, an array with each element
		//being a string of text
		var lines = text.split(/\n|\r\n|\r/);

		//Array of entry arrays
		var entryArray = [];
		for (var i = 0; i < lines.length; i++){
			entryArray[i] = lines[i].split(',');
		}
		fs.readFile('sparkLineData1.csv', function(err, data){
			var text = data.toString();
			//Break up file into lines, an array with each element
			//being a string of text
			var lines = text.split(/\n|\r\n|\r/);

			//Array of arrays of values for sparkline graphs
			var sparkArrays = [];
			for (var i = 0; i < lines.length; i++){
				sparkArrays[i] = lines[i].split(';');
			}
			res.render('index', {
			    locals: {
			      'title': 'UCLA Antimicrobial Guidelines Usage Data',
			      'entryArray': entryArray,
			      'sparkArrays': sparkArrays
			    }
		  	})	
		})
	})
})

app.get('/vap', function(req, res) {  
	fs.readFile ('VAPUsage.csv', function (err, data){
		if (err) throw err;
		//data is buffer, therefore convert to String
		var text = data.toString();
		//Break up file into lines, an array with each element
		//being a string of text
		var lines = text.split(/\n|\r\n|\r/);

		//Array of entry arrays
		var entryArray = [];
		for (var i = 0; i < lines.length; i++){
			entryArray[i] = lines[i].split(',');
		}

	  res.render('index2', {
	    locals: {
	      'title': 'Ventilator-associated Pneumonia Guideline Usage',
	      'entryArray': entryArray
	    }
	  })
	})
})

app.get('/hap', function(req, res) {  
	fs.readFile ('HAPUsage.csv', function (err, data){
		if (err) throw err;
		//data is buffer, therefore convert to String
		var text = data.toString();
		//Break up file into lines, an array with each element
		//being a string of text
		var lines = text.split(/\n|\r\n|\r/);

		//Array of entry arrays
		var entryArray = [];
		for (var i = 0; i < lines.length; i++){
			entryArray[i] = lines[i].split(',');
		}
	  res.render('index2', {
	    locals: {
	      'title': 'Hospital Acquired Pneumonia Guideline Usage',
	      'entryArray': entryArray
	    }
	  })
	})
})

app.get('/sepsisFeedback', function(req, res) {  
	fs.readFile ('sepsisFeedback.csv', function (err, data){
		if (err) throw err;
		//data is buffer, therefore convert to String
		var text = data.toString();
		//Break up file into lines, an array with each element
		//being a string of text
		var lines = text.split(/\n|\r\n|\r/);

		//Array of entry arrays
		var entryArray = [];
		for (var i = 0; i < lines.length; i++){
			entryArray[i] = lines[i].split(',');
		}

	  res.render('index2', {
	    locals: {
	      'title': 'Sepsis Guidelines User Feedback',
	      'entryArray': entryArray
	    }
	  })
	})
})

app.listen(process.env.PORT || 8000);