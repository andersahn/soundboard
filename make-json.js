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
      let path = `${metaFolder}/${name}.json`;
      if (fs.existsSync(path)) {
        meta = JSON.parse(fs.readFileSync(path, 'utf8'));
      } else {
        // remove kebab-case and use space for name in JSON
        // note that name is optional and can be removed
        meta.name = name.toLowerCase()
          .split('-')
          .join(' ');

        fs.writeFile(path, JSON.stringify(meta, null, 2), { flag: 'wx' }, function (err) {
          if (err) throw err;
          console.log("Created new meta file: " + path);
        });
      }
    } catch (error) {
      console.log(error);
    }
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
});
