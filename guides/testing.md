Create Reason React App uses [Jest](https://facebook.github.io/jest/) as its test runner.

Use `npm run test` to build the project and then run jest.

# Explanation

In `bsconfig.json`, a `js-post-build` option is exposed that allows the build to execute a command after the source is built. 

The script `scripts/copy.js` copies the JS source files into the `src` directory. (NOTE: these `.js` source files are removed after running `npm run clean`). This allows us to configure Jest to look inside the `src` directory  (see `package.json` for option `"jest": { "roots": [ "src" ] }`) and store the snapshots in `src/__tests__/snapshots`.
