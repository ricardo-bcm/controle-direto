<?php 
  $conexao = mysqli_connect('localhost','root','') or die('Erro' . mysql_error());
  $banco = mysqli_select_db($conexao,'controle-direto');
  mysqli_set_charset($conexao,'utf8');

  $sql = mysqli_query($conexao,"select * from pessoa") or die("Erro");

  $dataArray = array();

  while($dados=mysqli_fetch_assoc($sql))
      {
          $dataArray =  $dados;
      }
$json = json_encode($dataArray);

echo $json;