require('global');
const process = require('process');
const minimist = require('minimist');
const { Web3Storage, File } = require('web3.storage');
const sssa = require('./module/sssa.js');

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



async function main() {
    var shares = sssa.create(4, 5, "Hello World from Talfco")
    var files=[];

    for (var index in shares) {
        logger("Got share to store "+index+": "+shares[index]);
        try {
            files[index] = new File([ shares[index]],'share-'+index+'.txt')
        } catch (err) {
            console.error(err)
        }

    }
    var secret = sssa.combine(shares)
    logger("Got back secret ("+shares.length+"):"+secret)
    const sharesreduced = shares.slice(0,4)
    secret = sssa.combine(sharesreduced)
    logger("Got back secret ("+sharesreduced.length+"):"+secret)
    const storage = new Web3Storage({token: ""} );
    const cid = await storage.put(files)
    console.log('Content added with CID:', cid)

}

main();
