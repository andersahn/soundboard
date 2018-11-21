<?php
require_once 'vendor/autoload.php';

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
        $array[$subPath] = [];
    } else {
        // Add a new element to the array of the current file name.

        $realPath = $item->getRealPath();
        //$audio = new Mp3Info($item->getRealPath());

        $array[$subPath]['file'] = "./$subPath";
        $baseName = basename($realPath);
        $array[$subPath]['name'] = $baseName;
        $array[$subPath]['id'] = $baseName; //@todo id
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
