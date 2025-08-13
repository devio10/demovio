<?php
include "checkLogin.php";
include "setskin.php";
ini_set('upload_max_filesize', '40K');
ini_set('post_max_size', '40K');

$allowedDomain = 'https://demovio.love';

if (isset($_SERVER['HTTP_ORIGIN'])) {
  if ($_SERVER['HTTP_ORIGIN'] !== $allowedDomain) {
    header('HTTP/1.1 403 Forbidden');
    echo json_encode(['error' => 'Only official domain is allowed']);
    exit;
  }
}

if (isset($_SERVER['HTTP_REFERER'])) {
  $referer = parse_url($_SERVER['HTTP_REFERER'], PHP_URL_HOST);
  if ($referer !== parse_url($allowedDomain, PHP_URL_HOST)) {
    header('HTTP/1.1 403 Forbidden');
    echo json_encode(['error' => 'Only official domain is allowed']);
    exit;
  }
}

sleep(1);
$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);

session_start();
if (!checkLogin()) {
	echo "Not Authorised";
	setcookie("username", "", time()-3600);
	setcookie("password", "", time()-3600);
	exit;
}

try {
	$db = new PDO('sqlite:/var/demovio-minecraft-server/server/demovio.db');
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		$skin = $data['skin'];
		$skinToSet = $skin;
		$skinType = 'player';
		$username = $_COOKIE['username'];

		if ($data['file'] != "0") {
			$filename = $username . '.png';
			$filepath = __DIR__ . '/../skins/' . $filename;

			$imageData = base64_decode($data['file']);
			if (!$imageData) {
				echo "Wrong skin file";
				exit;
			}

			$imageSize = strlen($imageData);
			$maxSize = 12240;

			if ($imageSize > $maxSize) {
				echo 'Skin file is too big';
				exit;
			}

			if (file_put_contents($filepath, $imageData)) {
				$skin = 'skins/'.$filename;
				$skinToSet = '/var/www/demovio.love/'.$skin;
				$skinType = 'upload';
			}
		} else {
			$filename = '';
		}

		$stmt = $db->prepare("UPDATE players SET skin = :skin, skinModel = :type WHERE name = :username LIMIT 1");

		$stmt->execute([
			':username' => $username,
			':skin' => $skin,
			':type' => $data['skinType']
		]);

		if ($isActivated) {
			$changedSkin = setPlayerSkin($username, $skinToSet, $skinType);
			if ($changedSkin === false) {
				echo 'success_noskin';
			}
		}

		echo "success";
		// echo $skin;
	}
} catch (PDOException $e) {
	echo 'Error: ' . $e->getMessage();
}

?>