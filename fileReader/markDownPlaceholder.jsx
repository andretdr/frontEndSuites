/** For initial placeholder in the textarea, read from a file  */
import lineByLine from 'n-readlines'

const liner = new lineByLine('../assets/markdowntext.txt');

let placeHolderValue='';
let line;

while (line = liner.next()) {
    placeHolderValue += line.toString('ascii') + '\n';
}






// import lineReader from 'line-reader'

// let placeHolderValue='';

// lineReader.eachLine('../assets/markdowntext.txt', function(line, last) {
//   placeHolderValue += line + '\n';
//   if(last) {
//     console.log(placeHolderValue);
//   }
// });

export default placeHolderValue
