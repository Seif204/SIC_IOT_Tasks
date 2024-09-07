const fs = require('fs').promises;
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve)); 
}

function isValidInput(input) {
  return input.trim().length > 0;
}

function writeFileWithThen(input) {
  return fs.appendFile('tasks3.txt', input + '\n')
    .then(() => {
      console.log('data successfully by using .then()');
    })
    .catch(err => {
      console.error('Error', err);
    });
}

async function writeFileWithAsync(input) {
  try {
    await fs.appendFile('tasks3.txt', input + '\n');
    console.log('data successfully by using async/await ');
  } catch (err) {
    console.error('Error', err); 
  }
}

async function main() {
  let input;
  let method;

  while (true) {
    input = await askQuestion('enter text :');
    if (isValidInput(input)) { 
      break;  
    } else {
      console.log('invalid input');
    }
  }

  while (true) {
    method = await askQuestion('Choose 1 for .then() && 2 for async/await');
    if (method === '1') {
      writeFileWithThen(input);
      break;
    } else if (method === '2') {
      await writeFileWithAsync(input);
      break;
    } else {
      console.log('invalid choice');
    }
  }

  rl.close();
}

main();
