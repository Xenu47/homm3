function getPlayers(){
	var players = [];
	var ids = [];
	for (let i in gameState.players) {
		players.push(gameState.players[i].name);
		ids.push(gameState.players[i].user_id);
	}
	return [players,ids]
}

function loadMessages() {
	clearMessages();
	var message_display = document.getElementById("message_display");
	for (let i in gameState.chat) {
		var log = gameState.chat[Number(i)];
		var players = getPlayers();

		// console.log(players);
		var message = document.createElement("div");
		message.classList.toggle("message");
		message.classList.toggle("user_"+log.user_id);

		var time_message = document.createElement("span");
		time_message.classList.toggle("time_message");
		time_message.innerText = log.datetime;

		var nickname_message = document.createElement("span");
		nickname_message.classList.toggle("nickname_message");
		nickname_message.innerText = players[0][players[1].indexOf(log.user_id)] + ":";

		var text_message = document.createElement("span");
		text_message.classList.toggle("text_message");
		text_message.innerText = log.message;

		message.appendChild(time_message);
		message.appendChild(nickname_message);
		message.appendChild(text_message);
		message_display.appendChild(message);
	}
	
}

function clearMessages(){
	var message_display = document.getElementById("message_display");
	message_display.innerHTML = null;
}

function sendMessage(event){
	try{event.preventDefault();}
	catch{};
	var message_box = document.getElementById("message_box");
	var input_field = document.querySelectorAll("#message_box input")[0];
	if (input_field.value != ''){
		var current_date = new Date();
		var datetime = current_date.getHours() + ":" + current_date.getMinutes();
		var data = {
			"user_id": current_user,
			"message": input_field.value,
			"datetime": datetime
		}
		gameState.chat.push(data);
		input_field.value = null;
		loadMessages();
	}
}
