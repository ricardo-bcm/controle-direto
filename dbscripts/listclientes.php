<?php 
  include('database.php');

  $sql = mysqli_query($conexao,"SELECT id, nome, img_perfil FROM pessoa ORDER BY pessoa.nome") or die("Erro");

  $dataArray = array();

  while($dados=mysqli_fetch_assoc($sql))
      {
          $dataArray[] =  $dados;
      }
  $json = json_encode($dataArray);

echo $json;