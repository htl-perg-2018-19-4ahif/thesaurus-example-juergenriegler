let args = process.argv.slice(2);
if(args.length == 0) {
    console.log("Please specify words");
    process.exit(-1);
}
let rl = require('readline').createInterface({
    input: require('fs').createReadStream('openthesaurus.txt')
});
args.forEach(word => {
    let found: String = null;
    let matches = 0;
    rl.on('line', function (line) {
        found = null;
        let tWords = line.split(';');
        if(tWords.length<2) return;
        tWords.forEach(tWord => {
            if(tWord.indexOf(word) > -1) {
                found = tWord;
                matches++;
            }
        });
        if (found != null) printSynonyms(tWords, found);
    });
    rl.on('close', function() {
        if (matches < 1) console.log(`${word}: No matches found`);
        matches = 0;
    });    
});  

function printSynonyms(words: String[], word: String) {
    console.log(`${word}:`);
    words.forEach(w => {
        if(w===word) return;
        console.log(`\t${w}`);
    });
}