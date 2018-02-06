const list = async () => {
	const url = `database.php`;
	try {
		let response = await fetch( url );
		if ( response.ok ) {
			let jsonResponse = await response.json();
			console.log(jsonResponse);
			return jsonResponse;
		}
	} catch(e) {
		console.log(e);
	}
};

let showResponse = json => {
	let htmlFormated = '<ul class="list-group">';
	 json.forEach( function(element, index) {
	 	htmlFormated += `
		<li class="list-group-item"><img src="${element.img_perfil}" height="96px" width="96px"> ${element.nome} </li>
	 	`
	 });

	 htmlFormated += '</ul>'

	document.getElementById('infos').innerHTML = htmlFormated;
};

list().then( response => showResponse( response ) );