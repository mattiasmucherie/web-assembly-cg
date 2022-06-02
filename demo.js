(async () => {
  const importObject = {
    env: {
      abort(_msg, _file, line, column) {
        console.error("abort called at index.ts:" + line + ":" + column);
      },
    },
  };
  const module = await WebAssembly.instantiateStreaming(
    fetch("build/release.wasm"),
    importObject
  );

  const factorial = module.instance.exports.factorial;

  const result = document.querySelector("#result");
  document
    .querySelector("#prime-checker")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      result.innerText = "";
      const start = performance.now();
      for (let i = 0; i < 1000; i++) {
        result.innerText = factorial(6000);
      }
      const stop = performance.now();
      console.warn("wasm", stop - start);

      // const ackermann2 = (m, n) => {
      //   if (m === 0) {
      //     return n + 1;
      //   }
      //   if (n === 0) {
      //     return ackermann2(m - 1, 1);
      //   }
      //   if (m !== 0 && n !== 0) {
      //     return ackermann2(m - 1, ackermann2(m, n - 1));
      //   }
      // };
      const start2 = performance.now();
      function factorial2(i) {
        return i == 0 ? 1 : i * factorial2(i - 1);
      }
      for (let i = 0; i < 1000; i++) {
        factorial2(6000);
      }
      const stop2 = performance.now();
      console.warn("js", stop2 - start2);
    });
})();
