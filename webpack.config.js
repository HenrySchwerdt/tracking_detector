const path = require('path');

module.exports = {
  entry: './src/EventListener.js',
  output: {
    path: path.resolve(__dirname, 'public/background/'),
    filename: 'background.js',
  },
};