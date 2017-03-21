var fs = require('fs');
var path = require('path');
var plist = require('plist');

var target = "C:\\websync\\iosoapush_release\\configfile\\certificate.config";

try {
    var obj = plist.parse(fs.readFileSync(target, 'utf8'));
    var code = process.argv[2];
    var p12file = process.argv[3];
    var p12pass = process.argv[4];

    if(!code || !p12file || !p12pass) {
        console.log('ERROR: Missing parameters, require three parameters');
        return;
    }
    if(path.extname(p12file) !== '.p12') {
        console.log('ERROR: The second argument represents a file, and the suffix name must be .p12');
        return;
    }
    obj.push({
        "code": code,
        "p12file": p12file,
        "p12pass": p12pass
    });
    fs.writeFileSync(target, plist.build(obj));
}
catch(e) {
    console.log(e.message);
    return;
}


