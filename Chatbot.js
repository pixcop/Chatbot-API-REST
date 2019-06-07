const RiveScript = require("rivescript");
const ChatInterface = require("./ChatInterface.js");

class Chatbot{

	constructor(name, file, chatInterface, user){
		this.name = name;
		this.riveScript = new RiveScript();  // Init RiveScript logic
		this.riveScript.loadFile(file);  // load our replies file
		this.user = user;
		this.chatInterface = new ChatInterface(chatInterface, this);
	}

	getInterface(){
		return this.chatInterface;
	}

	deleteInterface(){
		this.chatInterface.delete();
	}

	loadfile(file){
		delete this.rivescript;
		this.riveScript = new RiveScript();  // Init RiveScript logic
		this.riveScript.loadFile(file+".rive");  // load our replies file
	}
}

module.exports = Chatbot;