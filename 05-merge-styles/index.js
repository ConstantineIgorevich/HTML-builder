const { readdir, createWriteStream, createReadStream } = require('fs');
const { join, extname } = require('path');

const bundle = join(__dirname, 'project-dist', 'bundle.css');
const sources = join(__dirname, 'styles');
const ws = createWriteStream(bundle);

readdir(sources, (err, content) => {
  content.forEach((fileName) => {
    if (extname(fileName) === '.css') {
      const filePath = join(sources, fileName);
      const rs = createReadStream(filePath, 'utf-8');
      rs.pipe(ws);
    }
  });
});
