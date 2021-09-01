require('global');
const process = require('process');
const minimist = require('minimist');
const { Web3Storage, getFilesFromPath } = require('web3.storage');
const fs = require('fs').promises;

const sssa = require('./module/sssa.js');

bigInt = require('big-integer');

function logger(text) {
    if (typeof document === "undefined") {
        console.log(text);
    } else {
        document.write(text + "<br>");
    }
}

function assertEqual(actual, expected) {
    if (typeof actual === typeof bigInt(0)) {
        if (actual.compare(expected) !== 0) {
            logger("Assert error: " + actual.toString() + " !== " + expected.toString());
            return false;
        }
    } else {
        if (actual !== expected) {
            logger("Assert error: " + actual + " !== " + expected);
            return false;
        }
    }
    return true;
}

async function openFile(share, index) {
    try {

        await fs.writeFile('./share-".csv', csvHeaders);
    } catch (error) {
        console.error(`Got an error trying to write to a file: ${error.message}`);
    }
}

async function main() {
    var shares = sssa.create(4, 5, "Hello World from Talfco")
    var files=[];
    for (var index in shares) {
        logger("Got share to store "+index+": "+shares[index]);
        files[index] = new global.File.constructor([shares[index]], 'plain-utf8.txt');
    }

    var secret = sssa.combine(shares)
    logger("Got back secret ("+shares.length+"):"+secret)
    const sharesreduced = shares.slice(0,4)
    secret = sssa.combine(sharesreduced)
    logger("Got back secret ("+sharesreduced.length+"):"+secret)
    const storage = new Web3Storage({token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEEzNzFlOUMwOWZiMjhjMTVkRDhGMUI4NTQwM2YyN2ZlOTlFMkU1MzQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MzA0NDQ1NTgxMjgsIm5hbWUiOiJTU1NBIn0.zA1f4fhbwntvVW3RtKGeowjHK29rYHf0fM7edwwpewI"} );
    const cid = await storage.put(files)
    console.log('Content added with CID:', cid)

}

main();
