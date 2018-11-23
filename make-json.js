const path = require('path');
const fs = require('fs');

const folder = path.resolve('./static/sounds/');

fs.readdir(folder, (err, files) => {
  const data = [];

  files.forEach((filename) => {
    console.log(filename);
    data.push({
      name: filename.split('.').slice(0, -1).join('.'),
      filename,
    });
  });

  fs.writeFileSync(
    'static/sounds.json',
    JSON.stringify(data),
  );
})
