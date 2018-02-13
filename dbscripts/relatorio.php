<?php 
  include('database.php');

  $sql = mysqli_query($conexao,"SELECT total FROM conta") or die("Erro");

  $dataArray = array();

  while($dados=mysqli_fetch_assoc($sql))
      {
          $dataArray[] =  $dados['total'];
      }
  $json = json_encode($dataArray);

echo $json;