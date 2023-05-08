<?php
$count = file_get_contents('counter.txt');
$count = intval($count);
$count++;
file_put_contents('counter.txt', $count);
echo $count;
?>
