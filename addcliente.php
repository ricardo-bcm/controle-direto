<?php
  header('Content-Type: application/json');
  $content = trim(file_get_contents("php://input"));
  $data = json_decode($content, true);

  $name = $data['nome'];
  $nasc = $data['data_nascimento'];
  $cpf = $data['cpf'];
  $data_cadastro = date('y-m-d');
  $img_perfil = '';

  if ( $data['img_perfil'] === '' ) {
    $img_perfil = 'imgs/perfil/default.jpg';
  } else {
    $img_perfil = 'imgs/perfil/' . $data['img_perfil'];
  }

  $conexao = mysqli_connect('localhost','root','') or die('Erro');
  mysqli_select_db($conexao,'controle_direto');

  $query = "INSERT INTO pessoa(nome, data_nascimento, data_cadastro, cpf, img_perfil) 
  VALUES('$name', '$nasc', '$data_cadastro', '$cpf', '$img_perfil')"; 

  mysqli_query( $conexao, $query ) or die("Erro". mysqli_error( $conexao ));

  //CRIANDO CONTA APOS CADASTRO
  $clienteId = mysqli_insert_id( $conexao );
  $queryConta = "INSERT INTO conta(total, pessoa_id) VALUES ('0.00','$clienteId')";

  mysqli_query( $conexao, $queryConta ) or die("Erro: " . mysqli_error( $conexao ));

 ?>