const path = require('path');
const fs = require('fs');

const soundFolder = path.resolve('./static/sounds/');
const metaFolder = path.resolve('./meta/');

fs.readdir(soundFolder, (err, files) => {
  const data = [];

  files.forEach((filename) => {
    const name = filename.split('.').slice(0, -1).join('.');
    let meta = {
      categories: [],
      icon: false,
    };
    try {
      // console.log(`${metaFolder}/${name}.json`);
      meta = JSON.parse(fs.readFileSync(`${metaFolder}/${name}.json`, 'utf8'));
    } catch (error) {}
    if (name) {
      console.log(filename);
      data.push({
        name: name.replace(/[\-\.]/gm, ' '),
        filename,
        meta,
      });
    }
  });

  fs.writeFileSync(
    'static/sounds.json',
    JSON.stringify(data),
  );
})
