const list = async () => {
	const url = `dbscripts/listclientes.php`;
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
	let htmlFormated = '';
	 json.forEach( function(element, index) {
	 	htmlFormated += `
		<li class="list-group-item list-class"><a href="perfilcliente.html?id=${element.id}"><img src="${element.img_perfil}" height="96px" width="96px"></a> ${element.nome} </li>
	 	`
	 });

	document.getElementById('lista-clientes').innerHTML = htmlFormated;
};

list().then( response => showResponse( response ) );