<?php
require_once 'vendor/autoload.php';

use wapmorgan\Mp3Info\Mp3Info;

$path =  __DIR__ . '/sounds';
/** @var RecursiveDirectoryIterator $iterator */
$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator(
        $path,
        RecursiveDirectoryIterator::SKIP_DOTS
    ),
    RecursiveIteratorIterator::SELF_FIRST
);

$array = [];
/** @var SplFileInfo $item */
foreach ($iterator as $item) {
    // Note SELF_FIRST, so array keys are in place before values are pushed.

    $subPath = $iterator->getSubPathname();
    if ($item->isDir()) {
        // Create a new array key of the current directory name.
        $array[$subPath] = array();
    } else {
        // Add a new element to the array of the current file name.
        $array[$subPath]['file'] = "./$subPath";
        $array[$subPath]['name'] = $item->getBasename();
        $array[$subPath]['id'] = $item->getBasename(); //@todo id
    }
}


$sounds = [];
foreach ($array as $item) {
    $sounds[] = ['name' => $item['name'], 'path' => "sounds/{$item['file']}", 'id' => $item['id']];
}


$soundsJson = json_encode($sounds);


$fo = fopen('sounds.json', 'w');
fwrite($fo, json_encode($sounds, JSON_PRETTY_PRINT));
fclose($fo);

$stop = 1;
