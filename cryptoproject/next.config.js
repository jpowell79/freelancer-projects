const withSASS = require('@zeit/next-sass');

module.exports = withSASS({
    sassLoaderOptions: {
        indentedSyntax: true,
        indentWidth: 4,
        outputStyle: 'expanded'
    }
});