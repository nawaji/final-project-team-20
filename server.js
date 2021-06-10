/* 
 * NOTE: This is a basic server.js file to test client-side/server-side interactions
 * with index.js/html whenever it's added
 */

/* 
 * NOTE: This is a basic server.js file to test client-side/server-side interactions
 * with index.js/html whenever it's added
 */

var fs = require("fs")
var express = require("express");
var exphbs = require("express-handlebars");
var user_data = require("./leaderboards.json");
//var bodyParser = require("body-parser")

console.log(user_data);


var app = express();
var port = process.env.PORT || 3001;

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//test

//app.use(bodyParser.json())
app.use(express.json())
app.use(express.static('public'));

app.get(["/ttt", "/"], function (req, res, next) {
	res.status(200).render('gamePage',{

		user_data

	});
})

app.post('/user/add', function (req, res, next) {
	var person = req.body
	console.log("== person:", person)

	//read leaderboards.json
	//check for duplicate name
	if (user_data[person.name]){
		console.log("user found")

		//update name/score if exists already
		user_data[person.name].score++
		sortUserData()

		fs.writeFile(__dirname + "/leaderboards.json",
		JSON.stringify(user_data, null, 2),
		function (err) {
			if(err){
				res.status(500).send("Error writing new data. Try again")
			} else{
//				console.log("before sort funct")
//				sortUserData()
				res.status(200).send()
			}			
		})

	//else push new name/score to leaderboards.json
	} else {
		console.log("new user")

		user_data[person.name] = {
			"score": 1
		}

		fs.writeFile(__dirname + "/leaderboards.json",
			JSON.stringify(user_data, null, 2),
		function (err) {
			if(err){
				res.status(500).send("Error writing new data. Try again")
			} else{
				res.status(200).send()
			}			
		})			
	}
})

function sortUserData() {
	var i = 0
	var name_arr = []
	var score_arr = []
	var sorted = false;

	//separate "name" and "score" into two different arrays
	for (key in user_data) {
		name_arr.push(key)
		score_arr.push(user_data[key].score)
	}

	//sort these two arrays based on a person's score
	while(!sorted) {
		sorted = true;
		for (i = 0; i < name_arr.length; i++) {
			if (i-1 >= 0) {
				if (score_arr[i-1] < score_arr[i]) {
					sorted = false;
					let sc_temp = score_arr[i-1]
					score_arr[i-1] = score_arr[i]
					score_arr[i] = sc_temp

					let nm_temp = name_arr[i-1]
					name_arr[i-1] = name_arr[i]
					name_arr[i] = nm_temp
				}
			}
		}
	}
	//rewrite our user data, recombining name and score arrays
	user_data = {}
	for (i = 0; i < name_arr.length; i++) {
		user_data[name_arr[i]] = {
			"score": score_arr[i]
		}
	}

	console.log(user_data)
}

app.get('*', function (req, res, next) {

	res.status(404).render('404');

})

app.listen(port, function () {
	console.log("== Server is listening on port", port);
})

