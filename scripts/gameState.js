var gameState = {
	"white": {
		"heroes": [
			{
				"id": 1,
				"name": "Chihiro",
				"icon": "👧",
				"posX": 1,
				"posY": 2
			},
			{
				"id": 3,
				"name": "Yubaba",
				"icon": "👵",
				"posX": 2,
				"posY": 2
			}
		]
	},
	"black": {
		"heroes":[
			{
				"id": 2,
				"name": "No-Face",
				"icon": "👺",
				"posX": 8,
				"posY": 5
			}
		]
	},
	"whiteFirst": true,
	"turn": 4
}
var lastGS = JSON.parse(JSON.stringify(gameState));

function clear(GS) {
	var field = document.getElementById("field");
	var heroes = GS.white.heroes.concat(GS.black.heroes);
	if (heroes) {
		for (i in heroes) {
			var hero = heroes[i];
			var name = hero.name;
			var posX = hero.posX;
			var posY = hero.posY;
			// console.log("CLEAR", name, posX, posY);

			var cell = field.querySelectorAll("tr:nth-of-type("+posY+") td:nth-of-type("+posX+")")[0];
			if (cell != null) {
				cell.style = cell.foo;
				cell.removeAttribute("title");
				cell.innerHTML = cell.id;
			}
		}
	}
}

function update() {
	clear(lastGS);
	var node = document.getElementById("input-json")
	if (node != null) {
		try {
			gameState = JSON.parse(node.value);
		} catch (error) {
			console.log(error);
		}
	}

	var size = document.getElementById("ninja").value*0.5+"px";
	var field = document.getElementById("field");
	var heroes = gameState.white.heroes;
	for (i in heroes) {
		var hero = heroes[i];
		var name = hero.name;
		var icon = hero.icon;
		var posX = hero.posX;
		var posY = hero.posY;
		// console.log("SET WHITE", name, posX, posY);

		var cell = field.querySelectorAll("tr:nth-of-type("+posY+") td:nth-of-type("+posX+")")[0];
		if (cell != null) {
			cell.foo = cell.style;
			cell.innerHTML = icon;
			cell.title = name;
			cell.style.fontSize = size;
			cell.style.fontFamily = "Noto";
			cell.style.color = "white";
		}
	}
	var heroes = gameState.black.heroes;
	for (i in heroes) {
		var hero = heroes[i];
		var name = hero.name;
		var icon = hero.icon;
		var posX = hero.posX;
		var posY = hero.posY;
		// console.log("SET BLACK", name, posX, posY);

		var cell = field.querySelectorAll("tr:nth-of-type("+posY+") td:nth-of-type("+posX+")")[0];
		if (cell != null) {
			cell.foo = cell.style;
			cell.innerHTML = icon;
			cell.title = name;
			cell.style.fontSize = size;
			cell.style.fontFamily = "Noto";
			cell.style.color = "black";
		}
	}
	lastGS = JSON.parse(JSON.stringify(gameState));
	gameState.turn += 1;
}


function example() {
	var inputField = document.getElementById("input-json")
	var tempTrash = JSON.parse(JSON.stringify(gameState));
	tempTrash.white.heroes[1].posX += 2;
	tempTrash.white.heroes[1].posY += 1;
	inputField.value = JSON.stringify(tempTrash);
}