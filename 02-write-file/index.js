const fs = require('fs');
const path = require('path');
const readline = require('readline');

console.log('Hello, friend, put some text... ');
process.on('exit', () => {
  ws.close();
  rl.close();
  console.log('Bye!');
});
process.on('SIGINT', () => {
  process.exit();
});
const ws = fs.createWriteStream(path.join(__dirname, 'output.txt'));
const rl = readline.createInterface({
  input: process.stdin,
});
rl.on('line', (line) => {
  if (line.trim() === 'exit') {
    process.exit();
  } else {
    ws.write(line + '\n');
  }
});
