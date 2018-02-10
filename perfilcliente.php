<?php 
  $conexao = mysqli_connect('localhost','root','') or die('Erro' . mysql_error());
  $banco = mysqli_select_db($conexao,'controle_direto');
  mysqli_set_charset($conexao,'utf8');

  $cliente_id = isset($_GET['id']) ? $_GET['id'] : die();

  $sql = mysqli_query($conexao,"SELECT * FROM pessoa JOIN conta ON pessoa.id = conta.id WHERE pessoa.id = '$cliente_id'") or die('Erro' . mysqlI_error($conexao));

  $cliente;

  while($dados=mysqli_fetch_assoc($sql))
      {
          $cliente =  $dados;
      }
  $json = json_encode($cliente);

echo $json;