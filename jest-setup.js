module.exports = () => {
  global.testServer = require('./backend/server');
  console.log(global.testServer);
};
