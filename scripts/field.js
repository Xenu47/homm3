function generate(){
	var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
	var field = document.getElementById("field");
	field.innerHTML = "";
	var x = 4;
	var y = 5;
	// var x = document.getElementById("field-x").value;
	// var y = document.getElementById("field-y").value;
	// console.log(x,y);
	// document.getElementById("value-x").innerHTML = "X = "+x;
	// document.getElementById("value-y").innerHTML = "Y = "+y;


	var sideSize = 180;
	// if (sideSize > 100) 	{sideSize = 100}
	// if (x*sideSize > 600) 	{sideSize = 600/x;} 
	// if (y*sideSize > 1000) 	{sideSize = 1000/y;}

    var tbody = document.createElement('tbody');
	for (let i = 0; i < x; i++) {
    	var tr = document.createElement('tr');
		for (let j = 0; j < y; j++) {
			var td = document.createElement('td');
			td.style.width = td.style.height = td.style.maxWidth = td.style.maxHeight = sideSize+"px";
			let id = alphabet[j]+(i+1).toString();
			td.id = id;
			// td.innerHTML = id;
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	field.appendChild(tbody);
	document.getElementById("ninja").value = sideSize;
	update();
}