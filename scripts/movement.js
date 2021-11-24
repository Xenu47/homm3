function move(){
	// console.log(gameState)
}

function getHeroById(id){
	var GSheroes = gameState.heroes;
	var players = [];
	var hero = null;
	for (let i in GSheroes) {
		if (GSheroes[i].id == id) {
			hero = GSheroes[i];
		}
	}
	return hero
}
function getHeroByPos(pos){
	var GSheroes = gameState.heroes;
	var x = pos[0];
	var y = pos[1];
	var hero = null;
	for (let i in GSheroes) {
		if (GSheroes[i].x == x && GSheroes[i].y == y) {
			hero = GSheroes[i];
		}
	}
	return hero
}
function getHeroesByUserId(user_id){
	var GSheroes = gameState.heroes;
	var heroes = [];
	for (let i in GSheroes) {
		if (GSheroes[i].user_id == user_id) {
			heroes.push(GSheroes[i]);
		}
	}
	return heroes
}

function showMoves(id){
	var field = document.getElementById("field");
	
	var hero = getHeroById(id);

	if (current_user == hero.user_id){

		var hero_cell = field.querySelectorAll("tr:nth-of-type("+(5-hero.y)+") td:nth-of-type("+hero.x+")")[0];
		hero_cell.oldcolor = hero_cell.style.backgroundColor;
		hero_cell.style.backgroundColor = "rgba(180, 201, 254, 0.9)";

		// var movement = hero.movement.split(';');
		// console.log(movement)
		var availableMoves = calculateMoves(hero.x, hero.y);
		// console.log(availableMoves)

		// console.log(availableMoves);
		for (let i in availableMoves) {

			try {
				var cellToHighlight = field.querySelectorAll("tr:nth-of-type("+(5-availableMoves[i][1])+") td:nth-of-type("+availableMoves[i][0]+")")[0];
				// console.log(cellToHighlight.id);
				if (cellToHighlight.childNodes[0] == null){
					cellToHighlight.oldcolor = cellToHighlight.style.backgroundColor;
					cellToHighlight.style.backgroundColor = "rgba(124, 212, 132, 0.9)";
				}
			} catch (error) {
				// console.log(error);
			}
		}
		// console.log(gameState)
	}
}

function hideMoves(id){
	var field = document.getElementById("field");
	if (id == null){
		id = Number(this.name);
	}

	var hero = getHeroById(id);

	if (current_user == hero.user_id){

		var hero_cell = field.querySelectorAll("tr:nth-of-type("+(5-hero.y)+") td:nth-of-type("+hero.x+")")[0];
		hero_cell.style.backgroundColor = hero_cell.oldcolor;

		// var movement = hero.movement.split(';');
		// console.log(movement)
		var availableMoves = calculateMoves(hero.x, hero.y);
		// console.log(availableMoves)

		for (let i in availableMoves) {

			try {
				var cellToHighlight = field.querySelectorAll("tr:nth-of-type("+(5-availableMoves[i][1])+") td:nth-of-type("+availableMoves[i][0]+")")[0];
				// console.log(cellToHighlight.id);
				if (cellToHighlight.childNodes[0] == null){
					cellToHighlight.style.backgroundColor = cellToHighlight.oldcolor;
					cellToHighlight.removeEventListener("click", makeMove, false);
					cellToHighlight.removeEventListener("click", makeAttack, false);
				}
			} catch (error) {
				// console.log(error);
			}
		}
		// console.log(gameState)
	}
}

function cancelAction(){
	generate();
}

function tryMove(id){
	var field = document.getElementById("field");
	
	var hero = getHeroById(id);

	if (current_user == hero.user_id){

		var hero_cell = field.querySelectorAll("tr:nth-of-type("+(5-hero.y)+") td:nth-of-type("+hero.x+")")[0];
		var active = hero_cell.querySelectorAll(".cell_overlay")[0];
		active.addEventListener("click", cancelAction, false);
		// hero_cell.style.backgroundColor = "rgba(192, 192, 192, 0.9)";

		var availableMoves = calculateMoves(hero.x, hero.y);
		// console.log(availableMoves)

		// console.log(availableMoves);
		for (let i in availableMoves) {

			try {
				var cellToHighlight = field.querySelectorAll("tr:nth-of-type("+(5-availableMoves[i][1])+") td:nth-of-type("+availableMoves[i][0]+")")[0];
				// console.log(cellToHighlight.id);
				if (cellToHighlight.childNodes[0] == null){
					cellToHighlight.removeEventListener("click", makeAttack, false);
					cellToHighlight.addEventListener("click", makeMove, false);
					cellToHighlight.name = [availableMoves[i][0],availableMoves[i][1],id];
				}
			} catch (error) {
				// console.log(error);
			}
		}
		// console.log(gameState)
	}
}

function makeMove(){
	var field = document.getElementById("field");
	let pos = this.name;
	this.removeAttribute("name");
	var hero = getHeroById(pos[2]);
	hero.moves_made += 1;
	hero.x = pos[0];
	hero.y = pos[1];
	gameState.version += 1;
	generate();
}

function tryAttack(id){
	cancelAction();
	var field = document.getElementById("field");
	
	var hero = getHeroById(id);

	if (current_user == hero.user_id){

		var hero_cell = field.querySelectorAll("tr:nth-of-type("+(5-hero.y)+") td:nth-of-type("+hero.x+")")[0];
		hero_cell.style.backgroundColor = "rgba(180, 201, 254, 0.9)";
		var active = hero_cell.querySelectorAll(".cell_overlay")[0];
		active.addEventListener("click", cancelAction, false);
		active.addEventListener("contextmenu", cancelAction, false);
		active.removeEventListener("mouseover", hoverOn, false);
		active.removeEventListener("mouseout", hoverOff, false);

		var availableMoves = calculateMoves(hero.x, hero.y);
		// console.log(availableMoves)

		var li = 0
		// console.log(availableMoves);
		for (let i in availableMoves) {

			try {
				var cellToHighlight = field.querySelectorAll("tr:nth-of-type("+(5-availableMoves[i][1])+") td:nth-of-type("+availableMoves[i][0]+")")[0];
				// console.log(cellToHighlight.id);
				cellToHighlight.style.backgroundColor = cellToHighlight.oldcolor;
				// if (cellToHighlight.childNodes[0] != null){
					cellToHighlight.style.backgroundColor = "rgba(232, 172, 134, 0.9)";
					cellToHighlight.removeEventListener("click", makeMove, false);
					cellToHighlight.addEventListener("click", makeAttack, false);
					cellToHighlight.name = [availableMoves[i][0],availableMoves[i][1],id];
					li += 1;
				// }
			} catch (error) {
				// console.log(error);
			}
		}
		if (li == 0){
			hero_cell.style.backgroundColor = "rgba(180, 201, 254, 0.9)";
		}
	}
}

function makeAttack(){
	var field = document.getElementById("field");
	let pos = this.name;
	this.removeAttribute("name");
	var hero = getHeroById(pos[2]);
	// console.log(hero);
	hero.moves_made = 100;
	hero.is_active = false;
	// console.log(hero);
	var enemy_hero = getHeroByPos([pos[0], pos[1]]);
	whoMoves();
	// console.log("KILL", hero);
	// let index = gameState.heroes.indexOf(enemy_hero);
	// if (index > -1) {
	// 	gameState.heroes.splice(index, 1);
	// }
	// gameState.version += 1;
	generate();
}

function whoMoves(test){
	var players = getPlayers();
	var GSheroes = gameState.heroes;
	var current_team = getHeroesByUserId(current_user);
	var heroes_stuck = 0;
	for (let i in GSheroes){
		if ((GSheroes[i].moves_made > GSheroes[i].speed) && (!GSheroes[i].is_active) && (GSheroes[i].user_id == current_user)){
			heroes_stuck += 1;
		}
	}
	console.log("heroes_stuck=",heroes_stuck);
	if (heroes_stuck == current_team.length){
		var q = players[1].concat();
		console.log("q=",q);
		q.splice(q.indexOf(current_user),1);
		console.log("q=",q);
		gameState.user_id_move = q[0];
	}
	if (current_user != gameState.user_id_move){
		console.log("gameState.user_id_move=",gameState.user_id_move);
		current_user = gameState.user_id_move;
		current_team = getHeroesByUserId(current_user);
		for (let i in current_team){
			current_team[i].moves_made = 0;
		}
	}
	
	for (let i in GSheroes){
		if ((GSheroes[i].user_id == current_user) && (GSheroes[i].moves_made < GSheroes[i].speed)){
			GSheroes[i].is_active = true
		} else { GSheroes[i].is_active = false }
	}
}

function calculateMoves(heroX, heroY){
	var coords = [[1,0],[-1,0],[0,1],[0,-1]];
	var res = []
	for (let i in coords) {
		res.push([heroX+coords[i][0],heroY+coords[i][1]]);
	}
	res = Array.from(new Set(res.map(JSON.stringify)), JSON.parse)
	// console.log(res)
	return res
}
