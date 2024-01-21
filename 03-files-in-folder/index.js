const { readdir, stat } = require('fs');
const { join, extname } = require('path');

const dir = join(__dirname, 'secret-folder');
readdir(dir, (err, content) => {
  content.forEach((entityName) => {
    const filePath = join(dir, entityName);
    stat(filePath, (error, stats) => {
      if (stats.isFile()) {
        const ext = extname(filePath);
        console.log(
          `${entityName.slice(0, -ext.length)}-${ext.slice(1)}-${stats.size}b`,
        );
      }
    });
  });
});
