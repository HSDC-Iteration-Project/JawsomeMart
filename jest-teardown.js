module.exports = async (globalConfig) => {
  console.log('teardown');
  console.log(global.testServer);
  await global.testServer.stop();
  };
  