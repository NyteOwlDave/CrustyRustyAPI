
// Returns a check-mark or ex-mark
const check = valid => valid ? "✅" : "❌";

// Returns TRUE if check-mark is the arg
const success = emoji => emoji == "✅";

// This returns TRUE if x^n would be complex 
const cplxe = (x, n) => check((x < 0) && (n % 1)); 