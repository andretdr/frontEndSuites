// This actually does nothing cos it reads the txt, and writes out the exact same text. the \n is ignored on the write


// https://www.npmjs.com/package/n-readlines

import lineByLine from 'n-readlines'


const liner = new lineByLine('./markdowntext.txt');

let line;
let str='';
 
while (line = liner.next()) {
    str += line.toString('ascii') + '\n';
}



// https://nodejs.org/en/learn/manipulating-files/writing-files-with-nodejs

import fs from 'node:fs'

fs.writeFile('./markdowntext.js', str, err => {
  if (err) {
    console.error(err);
  } else {
    console.error('done');
  }
});

















console.log(str);