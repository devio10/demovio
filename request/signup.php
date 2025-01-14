<?php
include "playerexists.php";
include "whitelist.php";
// include "setskin.php";
ini_set('upload_max_filesize', '50K');
ini_set('post_max_size', '50K');

$allowedDomain = 'https://demovio.lol';

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

sleep(3);
$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);

function isValidTelegramUsername($value)
{
	$regex = '/^(?!_)(?!.*__)[a-zA-Z0-9_]{5,32}(?<!_)$/';
	return preg_match($regex, $value) === 1;
}
function isValidMinecraftNickname($value)
{
	$regex = '/^[a-zA-Z_][a-zA-Z0-9_]{2,15}$/';
	return preg_match($regex, $value) === 1;
}

try {
	$db = new PDO('sqlite:/var/demovio-minecraft-server/server/demovio.db');
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		$username = $data['name'];
		$password = $data['password'];

		if (doesPlayerExists($username)) {
			echo 'Account already created';
			exit;
		}
		if (!isValidMinecraftNickname($username) || $username == null || $username == 'null') {
			echo 'Wrong Minecraft Nickname';
			exit;
		}
		if (strlen($password) < 8 || strlen($password) > 32) {
			echo 'Wrong password length';
			exit;
		}
		if (!isValidTelegramUsername($data['contact'])) {
			echo 'Wrong contact';
			exit;
		}

		$skin = $data['skin'];


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
			}
		} else {
			$filename = '';
		}

		$isActivated = checkForWhitelist($username);

		$stmt = $db->prepare("INSERT INTO players (name, password, skin, skinModel, citizenship, pronouns, contact, issueDate, isActivated) VALUES (:name, :password, :skin, :skinModel, :citizenship, :pronouns, :contact, :issueDate, :isActivated)");
		$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

		$stmt->execute([
			':name' => $username,
			':password' => $hashedPassword,
			':skin' => $skin,
			':skinModel' => $data['skinType'],
			':citizenship' => $data['citizenship'],
			':pronouns' => $data['pronouns'],
			':contact' => $data['contact'],
			':issueDate' => date('d.m.Y'),
			':isActivated' => $isActivated,
		]);

		// will not work properly until 1.21 update (hope so)

		// $skinToSet = $data['skin'];
		// if ($skinToSet == "") {
		// 	$skinToSet = $username;
		// }

		// if ($isActivated) {
		// 	$changedSkin = setPlayerSkin($username, $skinToSet);
		// 	if ($changedSkin == false) {
		// 		echo 'created_noskin';
		// 	}
		// }

		echo "created";

		setcookie('username', $username, time() + (86400 * 90), '/');
		setcookie('password', $hashedPassword, time() + (86400 * 90), '/');
	}
} catch (PDOException $e) {
	echo 'Error: ' . $e->getMessage();
}

?>