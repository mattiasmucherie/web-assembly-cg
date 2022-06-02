const Benchmark = require("benchmark");
const wasm = require(".");

function runSuite(suite) {
  console.log(`\nBenchmarking ${suite.name}:`);

  suite
    .on("cycle", function (event) {
      console.log(String(event.target));
    })
    .on("complete", function () {
      const fastest = this.filter("fastest");
      const slowest = this.filter("slowest");
      const difference =
        ((fastest.map("hz") - slowest.map("hz")) / slowest.map("hz")) * 100;
      console.log(
        `${fastest.map("name")} is ~${difference.toFixed(1)}% faster.`
      );
    })
    .run();
  const result = document.querySelector("#result");
  result.innerHTML = `${fastest.map("name")} is ~${difference.toFixed(
    1
  )}% faster.`;
}

function addTest() {
  function addJs(a, b) {
    return a + b;
  }
  const addAs = wasm.add;

  const test = new Benchmark.Suite("add");

  test
    .add("AssemblyScript", function () {
      addAs(1, 2);
    })
    .add("JavaScript", function () {
      addJs(1, 2);
    });
  runSuite(test);
}

function factorialTest() {
  function factorialJs(i) {
    return i == 0 ? 1 : i * factorialJs(i - 1);
  }
  const factorialAs = wasm.factorial;

  const test = new Benchmark.Suite("factorial");

  // console.log(factorialAs(20));

  test
    .add("AssemblyScript", function () {
      factorialAs(20);
    })
    .add("JavaScript", function () {
      factorialJs(20);
    });
  runSuite(test);
}

function ackermannTest() {
  function ackermannJs(m, n) {
    if (m === 0) {
      return n + 1;
    }
    if (n === 0) {
      return ackermannJs(m - 1, 1);
    }
    if (m !== 0 && n !== 0) {
      return ackermannJs(m - 1, ackermannJs(m, n - 1));
    }
  }
  const ackermannAs = wasm.ackermann;

  const test = new Benchmark.Suite("ackermann");

  // console.log(ackermannAs(3, 10));

  test
    .add("AssemblyScript", function () {
      ackermannAs(2, 1);
    })
    .add("JavaScript", function () {
      ackermannJs(2, 1);
    });
  runSuite(test);
}

function calcPrimesTest() {
  function isPrimeJs(x) {
    if (x < 2) {
      return false;
    }

    for (let i = 2; i < x; i++) {
      if (x % i === 0) {
        return false;
      }
    }

    return true;
  }
  const isPrimeAs = wasm.isPrime;

  const test = new Benchmark.Suite("calcPrimes");

  // console.log(ackermannAs(3, 10));
  const startNumber = 2;
  const stopNumber = 10000;
  test
    .add("AssemblyScript", function () {
      for (let i = startNumber; i < stopNumber; i++) {
        isPrimeAs(i);
      }
    })
    .add("JavaScript", function () {
      for (let i = startNumber; i < stopNumber; i++) {
        isPrimeJs(i);
      }
    });
  runSuite(test);
}

// addTest();
// factorialTest();
ackermannTest();
// calcPrimesTest();
