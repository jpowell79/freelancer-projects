module.exports = () => {
    if(!global.isProduction){
        global.isProduction = () => (
            process.argv[2] === 'production'
        );
        global.isDevelopment = () => (
            process.argv[2] !== 'production'
        );
    }
};