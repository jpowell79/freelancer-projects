const path = require("path");
const fs = require("fs");
global.PROJECT_ROOT = __dirname;

const scriptsFolder = path.join(__dirname, "/scripts");
const scripts = fs.readdirSync(scriptsFolder)
    .map(file => file.replace(".js", ""))
    .map(file => ({[file]: require(`${scriptsFolder}/${file}`)}))
    .reduce((accumulator, file) => Object.assign({}, accumulator, file));
const scriptNames = Object.keys(scripts);

console.log(scripts);

const printHelp = (arguments) => {
    let options = '';

    arguments.forEach((arg, i) => {
        options += arg;

        if (i !== arguments.length - 1) {
            options += '|';
        }
    });

    console.log(`Usage: node scripts.js [${options}]`);
    process.exit(0);
};

const argument = process.argv[2];

if (process.argv.length < 3 || !scriptNames.includes(argument)) {
    printHelp(scriptNames);
}

scripts[argument]()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });