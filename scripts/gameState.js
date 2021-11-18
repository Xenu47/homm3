var gameState = {
	"white": {
		"heroes": [
			{
				"id": 1,
				"name": "Chihiro",
				"icon": "👧",
				"movement": "r;;1;0;20",
				"posX": 1,
				"posY": 2
			},
			{
				"id": 3,
				"name": "Yubaba",
				"icon": "👵",
				"movement": "d;Y;2;1;1",
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
				"movement": "r;OXY;1;1;2",
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
				cell.style.fontSize = null;
				cell.style.fontFamily = null;
				cell.style.color = null;
				cell.removeAttribute("title");
				cell.removeAttribute("name");
				cell.removeEventListener("mouseover", hoverOn, false);
				cell.removeEventListener("mouseout", hoverOff, false);
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
		var id = hero.id;
		var name = hero.name;
		var icon = hero.icon;
		var posX = hero.posX;
		var posY = hero.posY;
		// console.log("SET WHITE", name, posX, posY);


		var cell = field.querySelectorAll("tr:nth-of-type("+posY+") td:nth-of-type("+posX+")")[0];
		if (cell != null) {
			cell.setAttribute("name",id);
			cell.innerHTML = icon;
			cell.title = name;
			cell.style.fontSize = size;
			cell.style.fontFamily = "Noto";
			cell.style.color = "white";
			cell.addEventListener("mouseover", hoverOn, false);
			cell.addEventListener("mouseout", hoverOff, false);
		}
	}
	var heroes = gameState.black.heroes;
	for (i in heroes) {
		var hero = heroes[i];
		var id = hero.id;
		var name = hero.name;
		var icon = hero.icon;
		var posX = hero.posX;
		var posY = hero.posY;
		// console.log("SET BLACK", name, posX, posY);

		var cell = field.querySelectorAll("tr:nth-of-type("+posY+") td:nth-of-type("+posX+")")[0];
		if (cell != null) {
			cell.setAttribute("name",id);
			cell.innerHTML = icon;
			cell.title = name;
			cell.name = id;
			cell.style.fontSize = size;
			cell.style.fontFamily = "Noto";
			cell.style.color = "black";
			cell.addEventListener("mouseover", hoverOn, false);
			cell.addEventListener("mouseout", hoverOff, false);
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

function hoverOn(){
	this.oldcolor = this.style.backgroundColor;
	this.style.backgroundColor = "rgba(124, 212, 132, 0.4)";
	showMoves(this.getAttribute("name"));
}

function hoverOff(){  
	this.style.backgroundColor = this.oldcolor;
	hideMoves(this.getAttribute("name"));
}