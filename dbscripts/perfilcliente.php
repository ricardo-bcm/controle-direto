<?php 
  include('database.php');

  $cliente_id = isset($_GET['id']) ? $_GET['id'] : die();

  $sql = mysqli_query($conexao,"SELECT pessoa.id, codigo, nome, DATE_FORMAT(data_cadastro,'%d/%m/%Y') AS data_cadastro, DATE_FORMAT(data_nascimento,'%d/%m') AS data_nascimento, img_perfil, observacao, total FROM pessoa JOIN conta ON pessoa.id = conta.pessoa_id WHERE pessoa.id = '$cliente_id'") or die('Erro' . mysqlI_error($conexao));

  $cliente = mysqli_fetch_assoc($sql);

  $queryTelefones = "SELECT telefone.numero, telefone.operadora FROM telefone INNER JOIN pessoa_telefone ON pessoa_telefone.telefone_id = telefone.id WHERE pessoa_telefone.pessoa_id = '$cliente_id'";

  $sqlTelefones = mysqli_query($conexao, $queryTelefones);

  $telefonesArray = array();

  while($telefone=mysqli_fetch_assoc($sqlTelefones))
      {
          $telefonesArray[] =  $telefone;
      }
      
  $cliente['telefones'] = $telefonesArray;


  $sqlTransacao = mysqli_query($conexao,"SELECT DATE_FORMAT(data,'%d/%m/%Y') AS data, comentario, tipo, valor FROM transacao WHERE conta_pessoa_id = '$cliente_id'") or die('Erro' . mysqlI_error($conexao));

  $transacoesArray = array();

  while($transacao=mysqli_fetch_assoc($sqlTransacao))
      {
          $transacoesArray[] =  $transacao;
      }
      
  $cliente['transacoes'] = $transacoesArray;

  $json = json_encode($cliente);

  echo $json;