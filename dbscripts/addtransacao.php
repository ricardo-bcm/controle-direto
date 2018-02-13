<?php
  include('database.php');
  header('Content-Type: application/json');
  $content = trim(file_get_contents("php://input"));
  $data = json_decode($content, true);

  $clienteId = $data['id'];
  $tipo = $data['tipo'];
  $valor = $data['valor'];
  $comentario = $data['comentario'];
  $data_transacao = date('y-m-d');
  if ( isset($data['data']) && !empty($data['data'])) {
    $data_transacao = $data['data'];
  }

  $queryContaId = "SELECT id, total FROM conta WHERE pessoa_id = '$clienteId' LIMIT 0,1";

  $sql = mysqli_query($conexao, $queryContaId);

  $conta = mysqli_fetch_assoc($sql);
  $contaId = $conta['id'];

  $query = "INSERT INTO transacao(data, comentario, tipo, valor, conta_id, conta_pessoa_id) 
  VALUES('$data_transacao', '$comentario', '$tipo', '$valor', '$contaId', '$clienteId')"; 

  mysqli_query( $conexao, $query ) or die("Erro". mysqli_error( $conexao ));

  //ALTERANDO VALOR TOTAL DA CONTA
  $total = $conta['total'];
  if ($tipo === 'VENDA') {
    $total += $valor;
  } elseif ( $tipo === 'RECEBIMENTO') {
    $total -= $valor;
  }

  $queryUpdateConta = "UPDATE conta SET total = '$total' WHERE id = '$contaId'";

  mysqli_query( $conexao, $queryUpdateConta ) or die("Erro: " . mysqli_error( $conexao ));

  echo json_encode('Tudo cerdo');

 ?>