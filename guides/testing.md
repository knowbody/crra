Create Reason React App uses [Jest](https://facebook.github.io/jest/) as its test runner.

Use `npm run test` to build the project and then run jest.

# Explanation

In `bsconfig.json`, a `js-post-build` option is exposed that allows the build to execute a command after the source is built. 

This script `scripts/copy.js` copies the JS source files into the `src` directory (they are removed after `npm run clean`). This allows us to specify the `src` folder as a root in our jest configuration (see `package.json` for option `"jest": { "roots": [ "src" ] }`).
