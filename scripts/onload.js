var current_user = 1;
window.onload = function() {
	whoMoves();
	generate();
	var players = getPlayers();
	current_user = players[1][0]
	var user1_name = document.querySelectorAll("#field_layout span.user_1")[0]
	user1_name.innerText = players[0][0];
	user1_name.addEventListener("click", function(){gameState.user_id_move = players[1][0]; whoMoves(); generate()}, false);
	var user2_name = document.querySelectorAll("#field_layout span.user_2")[0]
	user2_name.innerText = players[0][1];
	user2_name.addEventListener("click", function(){gameState.user_id_move = players[1][1]; whoMoves(); generate()}, false);

	var message_box = document.getElementById("message_box");
	message_box.addEventListener("submit", sendMessage);

	loadMessages();
}