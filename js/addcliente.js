$('.imageupload').imageupload();

document.getElementById('btn').onclick = () => {
  let aviso = document.getElementById('nome-input').value + ' cadastrada(o) com sucesso!';
  adicionarCliente().then( response => document.getElementById('caixa-aviso').innerHTML = aviso );
  document.getElementById('cliente-form').addEventListener('submit', event => {
    document.getElementById('cliente-form').reset();
    event.preventDefault();
  });
};


const adicionarCliente = async () => {
  const url = 'dbscripts/addcliente.php';

  let
  nomeInput = document.getElementById('nome-input').value,
  dataInput = document.getElementById('data-input').value,
  imagemInput = document.getElementById('imagem-input').value,
  observacaoInput = document.getElementById('observacao-input').value,
  telefone1Input = document.getElementById('telefone1-input').value,
  telefone2Input = document.getElementById('telefone2-input').value,
  telefone3Input = document.getElementById('telefone3-input').value,
  telefoneOp1Input = document.getElementById('telefone1-op-input').value,
  telefoneOp2Input = document.getElementById('telefone2-op-input').value,
  telefoneOp3Input = document.getElementById('telefone3-op-input').value;

  let telefones = [];
  if ( telefone1Input ) {
    let telefone1 = {
      numero: telefone1Input,
      operadora: telefoneOp1Input
    };
    telefones.push( telefone1 );
  }
  if ( telefone2Input ) {
    let telefone2 = {
      numero: telefone2Input,
      operadora: telefoneOp2Input
    };
    telefones.push( telefone2 );
  }
  if ( telefone3Input ) {
    let telefone3 = {
      numero: telefone3Input,
      operadora: telefoneOp3Input
    };
    telefones.push( telefone3 );
  }

  let nomeDaImagem = $('#imagem-input').val().split("\\").pop();

  let informacoes = {
    nome : nomeInput,
    data_nascimento : dataInput,
    observacao: observacaoInput
  };

  if ( telefones.length > 0) {
    informacoes.telefones = telefones;
  }

  informacoes.img_perfil = imagemInput ? nomeDaImagem : '';

  console.log(JSON.stringify(informacoes));

  let fetchData = {
    method: "POST",
    body: JSON.stringify(informacoes)
  };

  try {
      let response = await fetch( url, fetchData );
      console.log('Resposta: ' + response);
      if ( response.ok ) {
        let jsonResponse = await response.json();
        return jsonResponse;
      }
    } catch( e ) {
      console.log( 'Erro log: ' + e );
    }
}

document.getElementById('add-telefone-btn').onclick = () => {
  let state = document.getElementById('telefones-input').style.display;
  console.log(state);
  if (state === 'block') {
    document.getElementById('telefones-input').style.display = 'none';
  } else {
    document.getElementById('telefones-input').style.display = 'block';
  }
}