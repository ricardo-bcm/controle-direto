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

let 
clientes,
cliente;

list().then( response => clientes = response );

// Busca em tempo real (Ajax search)
$('#search-input').keyup( () => {
  let
  searchField = $('#search-input').val(),
  regex = new RegExp( searchField, "i" ),
  listSearch = '',
  propertiesFound = [];
  if ( !searchField ) {
    document.getElementById('search-results').innerHTML = '';
  } else {
    clientes.forEach( function(element, index) {
      if ( element.nome.search(regex) != -1 && searchField && propertiesFound.length < 5 ){
        propertiesFound.push(element);
      }
    });

    propertiesFound.sort();
    propertiesFound.forEach( function(element, index) {
      listSearch += `<li class="list-group-item link-class"> ${element.nome} </li>`;
    });
    document.getElementById('search-results').innerHTML = listSearch;
    propertiesFound.length = 0;
  }
});

$('#search-results').on('click', 'li', e => {
  let inputValue = $(e.currentTarget).text().trim();
  cliente = setCliente( inputValue );
  $('#search-input').val( inputValue );
  document.getElementById('search-results').innerHTML = '';
});

let setCliente = clienteNome => {
  let clienteTemp;
  clientes.forEach( function(element, index) {
    if ( element.nome === clienteNome ) {
      clienteTemp = element;
    }
  });
  return clienteTemp;
}

document.getElementById('submit-button').onclick = () => {
  adicionarTransacao().then( response => window.location.replace(`perfilcliente.html?id=${cliente.id}`) );
};


const adicionarTransacao = async () => {
  const url = 'dbscripts/addtransacao.php';

  let
  tipoInput = document.getElementById('tipo-transacao-input').value,
  valorInput = document.getElementById('valor-input').value,
  comentariosInput = document.getElementById('comentarios-input').value,
  dataTransacaoInput = document.getElementById('data-transacao-input').value;

  let informacoes = {
    id: cliente.id,
    tipo : tipoInput,
    valor : valorInput,
    comentario : comentariosInput
  };

  if ( dataTransacaoInput ) {
    informacoes.data = dataTransacaoInput;
  }

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