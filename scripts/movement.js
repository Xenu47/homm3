function move(){
	// console.log(gameState)
}

function getHeroData(id){
	var heroes = gameState.white.heroes.concat(gameState.black.heroes);
	var hero = null;
	for (let i in heroes) {
		if (heroes[i].id == id) {
			hero = heroes[i];
		};
	}
	return hero
}

function showMoves(id){
	var field = document.getElementById("field");
	
	var hero = getHeroData(id);

	var movement = hero.movement.split(';');
	// console.log(movement)
	var availableMoves = calculateMoves(movement, hero.posX, hero.posY);
	// console.log(availableMoves)

	for (let i in availableMoves) {

		try {
			var cellToHighlight = field.querySelectorAll("tr:nth-of-type("+availableMoves[i][1]+") td:nth-of-type("+availableMoves[i][0]+")")[0];
			// console.log(cellToHighlight.id);
			cellToHighlight.oldcolor = cellToHighlight.style.backgroundColor;
			cellToHighlight.style.backgroundColor = "rgba(232, 172, 134, 0.9)";
		} catch (error) {
			// console.log(error);
		}
	}
	// console.log(gameState)
}

function hideMoves(id){
	var field = document.getElementById("field");
	
	var hero = getHeroData(id);

	var movement = hero.movement.split(';');
	// console.log(movement)
	var availableMoves = calculateMoves(movement, hero.posX, hero.posY);
	// console.log(availableMoves)

	for (let i in availableMoves) {

		try {
			var cellToHighlight = field.querySelectorAll("tr:nth-of-type("+availableMoves[i][1]+") td:nth-of-type("+availableMoves[i][0]+")")[0];
			// console.log(cellToHighlight.id);
			cellToHighlight.style.backgroundColor = cellToHighlight.oldcolor;
		} catch (error) {
			// console.log(error);
		}
	}
	// console.log(gameState)
}

function calculateMoves(movement, heroX, heroY){
	var coords = [];
	var direction = movement[0];
	// console.log(direction);
	// console.log(typeof(direction));
	var mirror = movement[1];
	var x = Number(movement[2]);
	var y = Number(movement[3]);
	var repeat = Number(movement[4]);

	if (direction.includes('r')){
		coords.push([x,y]);
	} if (direction.includes('l')){
		coords.push([-x,-y]);
	} if (direction.includes('d')){
		coords.push([-y,x]);
	} if (direction.includes('u')){
		coords.push([y,-x]);
	} 


	if (mirror.includes('X')){
		for(let i in coords){
			let c = [coords[i][0],-coords[i][1]]
			coords.push(c)
		}
	} if (mirror.includes('Y')){
		for(let i in coords){
			let c = [-coords[i][0],coords[i][1]]
			coords.push(c)
		}
	} 
	if (mirror.includes('O')){
		for(let i in coords){
			let c = [-coords[i][1],-coords[i][0]]
			coords.push(c)
		}
	}

	var repCoords = []
	for (var i = 1; i <= repeat; i++) {
		for(let j in coords){
			repCoords.push(coords[j]);
			let x = coords[j][0]*i;
			let y = coords[j][1]*i;
			let c = [x,y];
			repCoords.push(c);
		}
	}

	var res = []
	for (let i in repCoords) {
		res.push([heroX+repCoords[i][0],heroY+repCoords[i][1]]);
	}
	res = Array.from(new Set(res.map(JSON.stringify)), JSON.parse)
	// console.log(res)
	return res
}