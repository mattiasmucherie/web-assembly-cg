const fs = require("fs");
const loader = require("@assemblyscript/loader");

function importCallback(a, b) {
  return a + b;
}

const imports = {
  test: {
    importCallback,
  },
};

const wasmModule = loader.instantiateSync(
  fs.readFileSync(__dirname + "/build/release.wasm"),
  imports
);

module.exports = {
  ...wasmModule.exports,
  importCallback,
};
