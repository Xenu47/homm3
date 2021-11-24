function move(){
	// console.log(gameState)
}

function getHeroById(id){
	var heroes = gameState.heroes;
	var players = [];
	var hero = null;
	for (let i in heroes) {
		if (heroes[i].id == id) {
			hero = heroes[i];
		}
	}
	return hero
}
function getHeroByPos(pos){
	var heroes = gameState.heroes;
	var x = pos[0];
	var y = pos[1];
	var hero = null;
	for (let i in heroes) {
		if (heroes[i].x == x && heroes[i].y == y) {
			hero = heroes[i];
		}
	}
	return hero
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
	hero.x = pos[0];
	hero.y = pos[1];
	generate();
	// hero_cell.style.backgroundColor = "rgba(192, 192, 192, 0.9)";

	// var movement = hero.movement.split(';');
	// console.log(movement)

	// console.log(gameState)
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

		// var movement = hero.movement.split(';');
		// console.log(movement)
		var availableMoves = calculateMoves(hero.x, hero.y);
		// console.log(availableMoves)

		var li = 0
		// console.log(availableMoves);
		for (let i in availableMoves) {

			try {
				var cellToHighlight = field.querySelectorAll("tr:nth-of-type("+(5-availableMoves[i][1])+") td:nth-of-type("+availableMoves[i][0]+")")[0];
				// console.log(cellToHighlight.id);
				cellToHighlight.style.backgroundColor = cellToHighlight.oldcolor;
				if (cellToHighlight.childNodes[0] != null){
					cellToHighlight.style.backgroundColor = "rgba(232, 172, 134, 0.9)";
					cellToHighlight.removeEventListener("click", makeMove, false);
					cellToHighlight.addEventListener("click", makeAttack, false);
					cellToHighlight.name = [availableMoves[i][0],availableMoves[i][1],id];
					li += 1;
				}
			} catch (error) {
				// console.log(error);
			}
		}
		if (li == 0){
			// hero_cell.style.backgroundColor = "rgba(24, 125, 224, 0.9)";
			hero_cell.style.backgroundColor = "rgba(180, 201, 254, 0.9)";
		}
		// console.log(gameState)
	}
}

function makeAttack(){
	var field = document.getElementById("field");
	let pos = this.name;
	this.removeAttribute("name");
	var hero = getHeroByPos([pos[0], pos[1]]);
	console.log("KILL", hero);
	// hero.x = pos[0];
	// hero.y = pos[1];
	let index = gameState.heroes.indexOf(hero);
	if (index > -1) {
		gameState.heroes.splice(index, 1);
	}
	generate();
	// hero_cell.style.backgroundColor = "rgba(192, 192, 192, 0.9)";

	// var movement = hero.movement.split(';');
	// console.log(movement)

	// console.log(gameState)
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

// function calculateMoves_old(movement, heroX, heroY){
// 	var coords = [];
// 	var direction = movement[0];
// 	// console.log(direction);
// 	// console.log(typeof(direction));
// 	var mirror = movement[1];
// 	var x = Number(movement[2]);
// 	var y = Number(movement[3]);
// 	var repeat = Number(movement[4]);

// 	if (direction.includes('r')){
// 		coords.push([x,y]);
// 	} if (direction.includes('l')){
// 		coords.push([-x,-y]);
// 	} if (direction.includes('d')){
// 		coords.push([-y,x]);
// 	} if (direction.includes('u')){
// 		coords.push([y,-x]);
// 	} 


// 	if (mirror.includes('X')){
// 		for(let i in coords){
// 			let c = [coords[i][0],-coords[i][1]]
// 			coords.push(c)
// 		}
// 	} if (mirror.includes('Y')){
// 		for(let i in coords){
// 			let c = [-coords[i][0],coords[i][1]]
// 			coords.push(c)
// 		}
// 	} 
// 	if (mirror.includes('O')){
// 		for(let i in coords){
// 			let c = [-coords[i][1],-coords[i][0]]
// 			coords.push(c)
// 		}
// 	}

// 	var repCoords = []
// 	for (var i = 1; i <= repeat; i++) {
// 		for(let j in coords){
// 			repCoords.push(coords[j]);
// 			let x = coords[j][0]*i;
// 			let y = coords[j][1]*i;
// 			let c = [x,y];
// 			repCoords.push(c);
// 		}
// 	}

// 	var res = []
// 	for (let i in repCoords) {
// 		res.push([heroX+repCoords[i][0],heroY+repCoords[i][1]]);
// 	}
// 	res = Array.from(new Set(res.map(JSON.stringify)), JSON.parse)
// 	// console.log(res)
// 	return res
// }