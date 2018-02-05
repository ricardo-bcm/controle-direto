$('.imageupload').imageupload();

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
	document.getElementById('infos').innerHTML = `
	${json.nome} <br>
	${json.data_nascimento} <br>
	${json.cpf} <br>
	<img src="${json.img_perfil}"> <br>
	`;
};

//list().then( response => showResponse( response ) );

document.getElementById('btn').onclick = () => {
	adicionarCliente().then( response => alert('Adiconado com sucesso!') );
};


const adicionarCliente = async () => {
	const url = 'addcliente.php';

	let
	nomeInput = document.getElementById('nome_input').value,
	dataInput = document.getElementById('data_input').value,
	cpfInput = document.getElementById('cpf_input').value,
	imagemInput = document.getElementById('imagem_input').value;

	let nomeDaImagem = $('#imagem_input').val().split("\\").pop();

	let informacoes = {
		nome : nomeInput,
		data_nascimento : dataInput,
		cpf : cpfInput,
	};

	informacoes.img_perfil = imagemInput ? nomeDaImagem : '';

	console.log(JSON.stringify(informacoes));

	let fetchData = {
		method: 'POST',
		headers: {
		    'Content-Type': 'application/json'
		  },
		body: JSON.stringify(informacoes)
	};

	try {
			let response = await fetch( url, fetchData );
		} catch( e ) {
			console.log( e );
		}
}