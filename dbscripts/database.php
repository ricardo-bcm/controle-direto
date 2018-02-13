<?php 
	date_default_timezone_set('America/Bahia');
	$conexao = mysqli_connect('localhost','root','') or die('Erro' . mysql_error());
	$banco = mysqli_select_db($conexao,'controle_direto');
 ?>