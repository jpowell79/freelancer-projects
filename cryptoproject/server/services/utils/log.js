const urls = require('./urls');

function sectionTitle(title){
    console.log("------------------------------------------------------------------------");
    console.log(title);
    console.log("------------------------------------------------------------------------");
}

function endOfSection(){
    console.log("------------------------------------------------------------------------\n");
}

function apiPoints(){
    let routesLog = '';

    Object.keys(urls).forEach((addressKey, i) => {
        if(urls[addressKey] !== urls.base){
            routesLog += `${i}: ${urls[addressKey]}/`;

            if(i !== Object.keys(urls).length-1){
                routesLog += '\n';
            }
        }
    });

    console.log(
        `Available API points:\n` +
        `${routesLog}`
    );
}

module.exports = {
    sectionTitle,
    endOfSection,
    apiPoints
};