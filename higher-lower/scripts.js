const fs = require("fs");
global.PROJECT_ROOT = __dirname;

const main = async () => {
    const scripts = readScripts();
    const argument = getValidatedArgument(Object.keys(scripts));

    return scripts[argument]();
};

const readScripts = () => {
    const scriptsFolder = `${__dirname}/scripts`;

    return fs.readdirSync(scriptsFolder)
        .map(file => file.replace(".js", ""))
        .map(file => ({[file]: require(`${scriptsFolder}/${file}`)}))
        .reduce((accumulator, file) => Object.assign({}, accumulator, file));
};

const getValidatedArgument = (arguments) => {
    const argument = process.argv[2];

    if (process.argv.length < 3 || !arguments.includes(argument)) {
        printHelp(arguments);
    }

    return argument;
};

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

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });