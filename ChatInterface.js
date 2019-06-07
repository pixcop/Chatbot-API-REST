class ChatInterface{

	constructor(name, chatbot){
		this.name = name;
		this.interface;
		this.chatbot = chatbot;
	}

	//run custom scripts
	run(){
		this.interface = require('./'+this.name);
		this.interface.runChat();
	}

	getRivescript(){
		return this.chatbot.riveScript;
	}

	getUser(){
		return this.chatbot.user;
	}

	delete(){
		this.interface.stopChat();
		delete this.interface;
	}
}

module.exports = ChatInterface;