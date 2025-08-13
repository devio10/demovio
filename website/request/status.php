<?php

	require __DIR__ . '/vendor/xpaw/php-minecraft-query/src/MinecraftQuery.php';
	require __DIR__ . '/vendor/xpaw/php-minecraft-query/src/MinecraftQueryException.php';
	use xPaw\MinecraftQuery;
	use xPaw\MinecraftQueryException;
	$Query = new MinecraftQuery();
	try
	{
		$Query->Connect( 'demovio.love', 25565 );
		$players = $Query->GetPlayers();
		if(gettype($players) == "boolean") {
			$playersList = "0";
		} else {
			$playersList = implode(',', $players);
		}

        echo $playersList;
	}
	catch( MinecraftQueryException $e )
	{
		echo "offline";
	}
?>