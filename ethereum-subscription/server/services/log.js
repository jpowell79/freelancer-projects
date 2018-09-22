const urls = require("../../services/constants/urls");

function sectionTitle(title){
    console.log("-".repeat(60));
    console.log(title);
    console.log("-".repeat(60));
}

function endOfSection(){
    console.log("-".repeat(60) + "\n");
}

function apiPoints(){
    let routesLog = "";

    Object.keys(urls).forEach((addressKey, i) => {
        if(urls[addressKey] !== urls.base){
            routesLog += `${i}: ${urls[addressKey]}/`;

            if(i !== Object.keys(urls).length-1){
                routesLog += "\n";
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