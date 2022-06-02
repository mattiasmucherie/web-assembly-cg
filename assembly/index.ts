// The entry file of your WebAssembly module.
export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function ackermann(m: i32, n: i32): i32 {
  if (m === 0) {
    return n + 1;
  }
  if (n === 0) {
    return ackermann(m - 1, 1);
  }
  if (m !== 0 && n !== 0) {
    return ackermann(m - 1, ackermann(m, n - 1));
  }
  return 1;
}
export function factorial(i: i32): i32 {
  return i == 0 ? 1 : i * factorial(i - 1);
}

export function calcSinLookup(): Float64Array {
  const max = 6283621;
  const result = new Float64Array(max);

  for (let i = 0; i < max; ++i) {
    unchecked((result[i] = Math.sin(i * 0.001)));
  }

  return result;
}

export function isPrime(x: u32): bool {
  if (x < 2) {
    return false;
  }

  for (let i: u32 = 2; i < x; i++) {
    if (x % i === 0) {
      return false;
    }
  }

  return true;
}
