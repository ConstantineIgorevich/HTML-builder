const { readdir, copyFile, mkdir, rm } = require('fs');
const { join } = require('path');
const copiedFolderPath = join(__dirname, 'files-copy');

rm(copiedFolderPath, { recursive: true }, () => {
  mkdir(copiedFolderPath, () => {
    readdir(join(__dirname, 'files'), (err, content) => {
      content.forEach((fileName) => {
        copyFile(
          join(__dirname, 'files', fileName),
          join(__dirname, 'files-copy', fileName),
          () => {},
        );
      });
    });
  });
});
