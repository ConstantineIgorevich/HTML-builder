const {
  mkdir,
  rm,
  readFile,
  readdir,
  writeFile,
  copyFile
} = require('fs/promises');
const { join } = require('path');
const distPath = join(__dirname, 'project-dist');

(async () => {
  try {
    await rm(distPath, { recursive: true });
  } catch (err) {
    err;
  }
  await mkdir(distPath);
  let htmlContent = await readFile(join(__dirname, 'template.html'), {
    encoding: 'utf-8',
  });
  const componentsName = await readdir(join(__dirname, 'components'));
  const components = [];
  for (const comp of componentsName) {
    const compPath = join(__dirname, 'components', comp);
    const res = await readFile(compPath, { encoding: 'utf-8' });
    components.push({
      name: comp.slice(0, -5),
      content: res,
    });
  }

  components.forEach((el) => {
    htmlContent = htmlContent.replace(`{{${el.name}}}`, el.content);
  });
  await writeFile(join(distPath, 'index.html'), htmlContent, { flag: 'w' });
})();
