<?php
$fd = fopen("./result/".$_POST['name'].".csv", 'w') or die("не удалось создать файл");
fputs($fd, chr(0xEF) . chr(0xBB) . chr(0xBF));
fwrite($fd, $_POST['data']);
fclose($fd);
die('ok');
?>