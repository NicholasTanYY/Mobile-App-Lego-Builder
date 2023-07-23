const path = require('path');
const pak = require('./package.json');

module.exports = {
  dependencies: {
    [pak.name]: {
      root: path.join(__dirname),
    },
  },
  androidAssets: ['./assets/model/'],
  assets: ['./assets/fonts/'],
};
