var args = process.argv.slice(2);
if (args.length == 0) {
    console.log("Please specify words");
    process.exit(-1);
}
var rl = require('readline').createInterface({
    input: require('fs').createReadStream('openthesaurus.txt')
});
args.forEach(function (word) {
    var found = null;
    var matches = 0;
    rl.on('line', function (line) {
        found = null;
        var tWords = line.split(';');
        if (tWords.length < 2)
            return;
        tWords.forEach(function (tWord) {
            if (tWord.indexOf(word) > -1) {
                found = tWord;
                matches++;
            }
        });
        if (found != null)
            printSynonyms(tWords, found);
    });
    rl.on('close', function () {
        if (matches < 1)
            console.log(word + ": No matches found");
        matches = 0;
    });
});
function printSynonyms(words, word) {
    console.log(word + ":");
    words.forEach(function (w) {
        if (w === word)
            return;
        console.log("\t" + w);
    });
}
