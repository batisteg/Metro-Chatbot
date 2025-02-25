'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    FB: {
      pageAccessToken : process.env.pageAccessToken ,
      verifyToken : process.env.verifyToken,
      appSecret: process.env.appSecret
    }
  }
}
else {
  module.exports = require('./development.json');
}
