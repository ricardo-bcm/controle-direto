const getPerfilInfos = async id => {
	const url = `dbscripts/perfilcliente.php?id=${id}`;
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

let showPcResponse = cliente => {
	let
	referenciaTabela,
	novaLinha,
	comentarioCell,
	tipoCell,
	dataCell,
	valorCell,
	conteudo;
console.log('Response: ' + cliente);
	document.getElementById('image-perfil').src = cliente.img_perfil;
	document.getElementById('name-perfil').innerHTML = cliente.nome.split(' ')[0];
	let perfilInfos = `
	<p>Aniversário: ${cliente.data_nascimento}</p>
	<p>Cadastrado em : ${cliente.data_cadastro}</p>
	<h6>Telefones</h6>`;
	cliente.telefones.forEach( function(element, index) {
		perfilInfos += `${element.numero} (${element.operadora})<br>`;
	});
	document.getElementById('some-perfil-infos').innerHTML = perfilInfos;
	document.getElementById('observacao-perfil').innerHTML = `"${cliente.observacao}"`;
	document.getElementById('valor-conta').innerHTML = `TOTAL: R$ ${cliente.total}`;

	referenciaTabela = document.getElementById('tabela-informacoes').getElementsByTagName('tbody')[0];

	cliente.transacoes.reverse().forEach( function(element, index) {
		novaLinha = referenciaTabela.insertRow(referenciaTabela.rows.length);
		comentarioCell = novaLinha.insertCell(0);
		conteudo = document.createTextNode( element.comentario );
		comentarioCell.appendChild(conteudo);
		tipoCell = novaLinha.insertCell(1);
		conteudo = document.createTextNode( element.tipo );
		tipoCell.appendChild(conteudo);
		dataCell = novaLinha.insertCell(2);
		conteudo = document.createTextNode( element.data );
		dataCell.appendChild(conteudo);
		valorCell = novaLinha.insertCell(3);
		let text = element.tipo === 'VENDA' ? `+ R$ ${element.valor}` : `- R$ ${element.valor}`;
		conteudo = document.createTextNode( text );
		valorCell.appendChild(conteudo);
	});
};

let url = new URL(window.location.href);
let id = url.searchParams.get('id');

getPerfilInfos( id ).then( response => showPcResponse( response ) );