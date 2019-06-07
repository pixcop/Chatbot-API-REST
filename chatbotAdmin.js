var express = require("express");
var bodyParser = require("body-parser");
var Chatbot = require("./Chatbot.js");
var ChatInterface = require("./ChatInterface.js");
var User = require("./User.js")
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var port = 3000;
 
let userData;
let brains = ["standard", "eliza"];
let charbot;
let user;

// Create chatbot and user
app.post('/chatbot', function(req, res) {

	//store data
 	userData = {
 		"chatbot": {
			"botName": req.body.botName,
			"brain": "standard",
			"chatInterface": "Discord"
 		},
 		"user": {
 			"login": req.body.login,
 			"favoriteInterface": "Discord",
 			"token": "NTgyOTA4MDE2NDMzODIzNzU0.XO0yXw.lca_APM12SidXX-NY0vJGzzQ7KM"
 		}
   	 };

	// New user
	user = new User(userData.user.userLogin, userData.user.favoriteInterface, userData.user.token);

	// New chatbot with standard config
	chatbot = new Chatbot(userData.chatbot.botName, userData.chatbot.brain+".rive", userData.chatbot.chatInterface, user);

	// Init new View
	chatInterface = chatbot.getInterface();
	chatInterface.run();

	res.send("User added successfully");
});

//update brain
app.put('/chatbot/:brain', function(req, res) {
	userData.chatbot.brain = req.params.brain;
	chatbot.loadfile(userData.chatbot.brain);
	res.send('user updated sucessfully');
});

// Show user
app.get('/chatbot', function(req, res) {
	if(userData == null){
		res.send("No user is found")
	}else{
		res.json(userData);
	}
});

// Delete interface
app.delete('/chatbot/:chatInterface', function(req, res) {
	var cInterface = req.params.chatInterface;
	if(userData.chatbot.chatInterface == cInterface){
		userData.chatbot.chatInterface = "";
		chatbot.deleteInterface();
		res.send('interface deleted');
	}else{
		res.send("No interface "+cInterface);
	}
});

// Show brains
app.get('/brains', function(req, res) {
	res.json(brains);
});

app.listen(port, () => {
 console.log("Server running on port "+port);
});