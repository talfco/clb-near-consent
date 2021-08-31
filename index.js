require('global');

global.testing = true;
sssa = require('./module/sssa.js');
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

function main() {
    var utils = global._sssa_utils;

    var tests = [
        function() {
            var start = new Date();

            var values = ["N17FigASkL6p1EOgJhRaIquQLGvYV0", "0y10VAfmyH7GLQY6QccCSLKJi8iFgpcSBTLyYOGbiYPqOpStAf1OYuzEBzZR", "KjRHO1nHmIDidf6fKvsiXWcTqNYo2U9U8juO94EHXVqgearRISTQe0zAjkeUYYBvtcB8VWzZHYm6ktMlhOXXCfRFhbJzBUsXaHb5UDQAvs2GKy6yq0mnp8gCj98ksDlUultqygybYyHvjqR7D7EAWIKPKUVz4of8OzSjZlYg7YtCUMYhwQDryESiYabFID1PKBfKn5WSGgJBIsDw5g2HB2AqC1r3K8GboDN616Swo6qjvSFbseeETCYDB3ikS7uiK67ErIULNqVjf7IKoOaooEhQACmZ5HdWpr34tstg18rO"],
                minimum = [4, 6, 20],
                shares = [5, 100, 100];

            for (var index in values) {
                var result = assertEqual(sssa.combine(sssa.create(minimum[index], shares[index], values[index])), values[index]);
                if (!result) {
                    logger("Test failed: TestCreateCombine");
                    return false;
                }
            }

            var end = new Date();
            logger("ok @ TestCreateCombine in " + ((end.getTime() - start.getTime())/1000) + "s");
            return true;
        },

        function() {
            var start = new Date();

            var shares = ["U1k9koNN67-og3ZY3Mmikeyj4gEFwK4HXDSglM8i_xc=yA3eU4_XYcJP0ijD63Tvqu1gklhBV32tu8cHPZXP-bk=", "O7c_iMBaGmQQE_uU0XRCPQwhfLBdlc6jseTzK_qN-1s=ICDGdloemG50X5GxteWWVZD3EGuxXST4UfZcek_teng=", "8qzYpjk7lmB7cRkOl6-7srVTKNYHuqUO2WO31Y0j1Tw=-g6srNoWkZTBqrKA2cMCA-6jxZiZv25rvbrCUWVHb5g=", "wGXxa_7FPFSVqdo26VKdgFxqVVWXNfwSDQyFmCh2e5w=8bTrIEs0e5FeiaXcIBaGwtGFxeyNtCG4R883tS3MsZ0=", "j8-Y4_7CJvL8aHxc8WMMhP_K2TEsOkxIHb7hBcwIBOo=T5-EOvAlzGMogdPawv3oK88rrygYFza3KSki2q8WEgs="];
            var result = assertEqual(sssa.combine(shares), "test-pass");

            if (!result) {
                logger("Test failed: TestLibraryCombine");
                return false;
            }
            var end = new Date();

            logger("ok @ TestLibraryCombine in " + ((end.getTime() - start.getTime())/1000) + "s");
            return true;
        },

        function (){
            var shares = sssa.create(4, 5, "Hello World from Talfco")
            for (var index in shares) {
                logger("Got share to store "+index+": "+shares[index]);
            }
            var secret = sssa.combine(shares)
            logger("Got back secret ("+shares.length+"):"+secret)
            const sharesreduced = shares.slice(0,4)
            secret = sssa.combine(sharesreduced)
            logger("Got back secret ("+sharesreduced.length+"):"+secret)
        }
    ];

    for (var i in tests) {
        if (!tests[i]()) {
            return false;
        }
    }
}

main();
