const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');

test('Plugin test', (next) => {

  webpack(config).run(function(err, stats) {
    expect(err).toBe(null);
    const fs = stats.compilation.inputFileSystem;
    let actual = fs.readFileSync(path.resolve('test/dist/index.bundle.js')).toString();
    [
      './test/env/client/router.js',
      './test/env/client/index.js',
      './node_modules/react/index.js'
    ].forEach(file => {
      expect(actual.indexOf(file) !== -1).toBe(true)
    })

    actual = fs.readFileSync(path.resolve('test/dist/0.bundle.js')).toString();
    [
      './test/env/client/components/Link.jsx',
      './test/env/client/screens/About.jsx'
    ].forEach(file => {
      expect(actual.indexOf(file) !== -1).toBe(true)
    })

    actual = fs.readFileSync(path.resolve('test/dist/1.bundle.js')).toString();
    [
      './test/env/client/components/Link.jsx',
      './test/env/client/screens/Hello.jsx'
    ].forEach(file => {
      expect(actual.indexOf(file) !== -1).toBe(true)
    })

    actual = fs.readFileSync(path.resolve('test/dist/2.bundle.js')).toString();
    [
      './test/env/client/components/Link.jsx',
      './test/env/client/screens/sample/More.jsx'
    ].forEach(file => {
      expect(actual.indexOf(file) !== -1).toBe(true)
    })
    next();
  });
})
