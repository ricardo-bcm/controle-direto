const getPerfilInfos = async id => {
	const url = `perfilcliente.php?id=${id}`;
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

let showPcResponse = json => {
	document.getElementById('image-perfil').src = json.img_perfil;
	document.getElementById('name-perfil').innerHTML = json.nome;
	document.getElementById('some-perfil-infos').innerHTML = `
	<p>Nascimento: ${json.data_nascimento}</p>
	<p>Cadastrado em : ${json.data_cadastro}</p>`;
	document.getElementById('valor-conta').innerHTML = `R$ ${json.total}`;
};

getPerfilInfos( 3 ).then( response => showPcResponse( response ) );