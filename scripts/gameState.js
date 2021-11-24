// var gameState = {
// 	"white": {
// 		"heroes": [
// 			{
// 				"id": 1,
// 				"name": "Patches",
// 				"icon": "👧",
// 				"icon_name": "Patches_the_Pirate_full.jpg",
// 				"hp": 20,
// 				"attack": 3,
// 				"speed": 2,
// 				"movement": "rlud;;1;0;1",
// 				"posX": 1,
// 				"posY": 2
// 			},
// 			// {
// 			// 	"id": 3,
// 			// 	"name": "Yubaba",
// 			// 	"icon": "👵",
// 			// 	"hp": 10,
// 			// 	"attack": 2,
// 			// 	"speed": 1,
// 			// 	"movement": "rlud;;1;0;1",
// 			// 	"posX": 2,
// 			// 	"posY": 2
// 			// }
// 		]
// 	},
// 	"black": {
// 		"heroes":[
// 			{
// 				"id": 2,
// 				"name": "No-Face",
// 				"icon": "👺",
// 				"hp": 5,
// 				"attack": 10,
// 				"speed": 3,
// 				"movement": "rlud;;1;0;1",
// 				"posX": 8,
// 				"posY": 5
// 			}
// 		]
// 	},
// 	"whiteFirst": true,
// 	"turn": 4
// }

var gameState = {
	"version": 1,
	"players": [
		{
			"name": "viplash4",
			"user_id": 1
		},
		{
			"name": "Xenu",
			"user_id": 2
		}
	],
	"heroes": [
		{
			"id": 1,
			"name": "Patches",
			"icon_name": "Patches_the_Pirate_full.jpg",
			"hp": 20,
			"attack": 3,
			"speed": 2,
			"x": 2,
			"y": 1,
			"user_id": 2,
			"is_active": true
		},
		{
			"id": 3,
			"name": "Detective Pepe",
			"icon_name": "Detective Pepe.png",
			"hp": 10,
			"attack": 5,
			"speed": 3,
			"x": 5,
			"y": 4,
			"user_id": 1,
			"is_active": true
		}
	],
	"messages": [
		"Вася ударил петю. Нанес 10 урона.",
		"Петя откинул копыта",
		"Здесь будут последние 10 сообщений"
	],
	"user_id_move": 1,
	"winner": null,
	"chat": [
		{
			"user_id": 2,
			"message": "невиплашам привет!",
			"datetime": "19:57"
		},
		{
			"user_id": 1,
			"message": "а?",
			"datetime": "19:58"
		},
		{
			"user_id": 1,
			"message": "дароу",
			"datetime": "19:58"
		},
		{
			"user_id": 2,
			"message": "в доту?",
			"datetime": "19:57"
		},
		{
			"user_id": 2,
			"message": "а патом работать.......",
			"datetime": "19:57"
		},
		{
			"user_id": 1,
			"message": "нуууууу",
			"datetime": "19:59"
		},
		{
			"user_id": 1,
			"message": "я щас презентацию с английского сдам",
			"datetime": "19:59"
		},
		{
			"user_id": 1,
			"message": "и можем работать",
			"datetime": "19:59"
		}
	]
}


var lastGS = JSON.parse(JSON.stringify(gameState));

function clear(GS) {
	var field = document.getElementById("field");
	var heroes = GS.heroes;
	if (heroes) {
		for (i in heroes) {
			var hero = heroes[i];
			var name = hero.name;
			var x = hero.x;
			var y = hero.y;
			// console.log("CLEAR", name, posX, posY);

			var cell = field.querySelectorAll("tr:nth-of-type("+(5-y)+") td:nth-of-type("+x+")")[0];
			if (cell != null) {
				cell.style.fontSize = null;
				cell.style.fontFamily = null;
				cell.style.color = null;
				cell.removeAttribute("title");
				cell.removeAttribute("name");
				cell.removeEventListener("mouseover", hoverOn, false);
				cell.removeEventListener("mouseout", hoverOff, false);
				cell.removeEventListener("click", clickOn, false);
				cell.removeEventListener("click", makeMove, false);
				cell.removeEventListener("click", makeAttack, false);
				cell.removeEventListener("contextmenu", contextOn, false);
				cell.innerHTML = null;
			}
		}
	}
}

function update() {
	clear(lastGS);
	// var node = document.getElementById("input-json")
	// if (node != null) {
	// 	try {
	// 		gameState = JSON.parse(node.value);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

	var size = document.getElementById("ninja").value*0.5+"px";
	var field = document.getElementById("field");
	var heroes = gameState.heroes;
	for (i in heroes) {
		var hero = heroes[i];
		var id = hero.id;
		var name = hero.name;
		var icon = hero.icon;
		var hp = hero.hp;
		var attack = hero.attack;
		var speed = hero.speed;
		var x = hero.x;
		var y = hero.y;
		// console.log("SET WHITE", name, posX, posY);


		var cell = field.querySelectorAll("tr:nth-of-type("+(5-y)+") td:nth-of-type("+x+")")[0];
		if (cell != null) {
			// cell.innerHTML = icon;
			cell.title = name;

			var card_disp = document.createElement("div");
			card_disp.classList.toggle("card_disp");
			var image_disp = document.createElement("div");
			image_disp.classList.toggle("image_disp");
			var icon_disp = document.createElement("img");
			icon_disp.classList.toggle("icon_disp");
			var border_disp = document.createElement("img");
			border_disp.classList.toggle("border_disp");
			var attack_disp = document.createElement("div");
			attack_disp.classList.toggle("attack_disp");
			var hp_disp = document.createElement("div");
			hp_disp.classList.toggle("hp_disp");			
			var cell_overlay = document.createElement("div");
			cell_overlay.classList.toggle("cell_overlay");

			image_disp.appendChild(icon_disp);
			image_disp.appendChild(border_disp);
			card_disp.appendChild(image_disp);
			card_disp.appendChild(attack_disp);
			card_disp.appendChild(hp_disp);
			cell.appendChild(card_disp);
			cell_overlay.setAttribute("name",id);
			card_disp.appendChild(cell_overlay);

			icon_disp.src = "props/"+hero.icon_name;
			border_disp.src = "props/hs_icon.png";
			attack_disp.innerHTML = attack;
			hp_disp.innerHTML = hp;

			cell_overlay.addEventListener("mouseover", hoverOn, false);
			cell_overlay.addEventListener("mouseout", hoverOff, false);
			cell_overlay.addEventListener("click", clickOn, false);
			cell_overlay.addEventListener("contextmenu", contextOn, false);

			cell.style.fontSize = size;
			cell.style.fontFamily = "Noto";
			cell.style.color = "white";
		}
	}
	lastGS = JSON.parse(JSON.stringify(gameState));
	gameState.version += 1;
}


function example() {
	var inputField = document.getElementById("input-json")
	var tempTrash = JSON.parse(JSON.stringify(gameState));
	tempTrash.white.heroes[1].posX += 2;
	tempTrash.white.heroes[1].posY += 1;
	inputField.value = JSON.stringify(tempTrash);
}

function hoverOn(){
	showMoves(this.getAttribute("name"));
}

function hoverOff(){
	hideMoves(this.getAttribute("name"));
}

function clickOn(){
	this.removeEventListener("mouseout", hoverOff, false);
	tryMove(this.getAttribute("name"));
}

function contextOn(event){
	event.preventDefault();
	tryAttack(this.getAttribute("name"));
}