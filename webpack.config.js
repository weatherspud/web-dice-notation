const path = require('path');

const config = {
    entry: {
        dice_notation: './src/js/dice_notation.js'
    },
    output: {
        path: path.resolve(__dirname, 'static/js/'),
        filename: '[name].bundle.js'
    }
};

module.exports = config;
