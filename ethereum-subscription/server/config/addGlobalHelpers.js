module.exports = () => {
    if(!global.isProduction){
        global.isProduction = () => {
            return process.argv[2] === 'production';
        };
    }
};