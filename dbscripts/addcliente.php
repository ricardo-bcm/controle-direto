<?php
  include('database.php');
  header('Content-Type: application/json');
  $content = trim(file_get_contents("php://input"));
  $data = json_decode($content, true);

  if ( !isset( $data ) || empty($data) || $data === NULL ) {
    $response['status'] = array(
        'type' => 'message',
        'value' => '400',
      );
    $encoded = json_encode($response);
    exit($encoded);
  } else {
    $name = $data['nome'];
    $nasc = $data['data_nascimento'];
    $data_cadastro = date('y-m-d');
    $img_perfil = '';
    $observacao = $data['observacao'];
    $telefones = $data['telefones'];

    if ( $data['img_perfil'] === '' ) {
      $img_perfil = 'imgs/perfil/default.jpg';
    } else {
      $img_perfil = 'imgs/perfil/' . $data['img_perfil'];
    }

    $codigo = md5($name);

    $query = "INSERT INTO pessoa(codigo, nome, data_nascimento, data_cadastro, img_perfil, observacao) 
    VALUES('$codigo', '$name', '$nasc', '$data_cadastro', '$img_perfil', '$observacao')"; 

    mysqli_query( $conexao, $query ) or die("Erro". mysqli_error( $conexao ));

    //CRIANDO CONTA APOS CADASTRO
    $clienteId = mysqli_insert_id( $conexao );
    $queryConta = "INSERT INTO conta(total, pessoa_id) VALUES ('0.00','$clienteId')";

    mysqli_query( $conexao, $queryConta ) or die("Erro: " . mysqli_error( $conexao ));

    if ( isset( $telefones ) && !empty( $telefones ) ) {
      foreach ($telefones as $row) {
        $numero = $row['numero'];
        $op = $row['operadora'];
        $queryTel =  "INSERT INTO telefone( numero, operadora) VALUES ('$numero', '$op')";
        mysqli_query( $conexao, $queryTel) or die(mysqli_error( $conexao ));

        $telefoneId = mysqli_insert_id( $conexao );
        $queryTelefonePessoa = "INSERT INTO pessoa_telefone(pessoa_id, telefone_id) VALUES ('$clienteId', '$telefoneId')";
        mysqli_query( $conexao, $queryTelefonePessoa ) or die("Erro: " . mysqli_error( $conexao ));
      }
    }
    echo json_encode($clienteId);
  } //Fim else
 ?>