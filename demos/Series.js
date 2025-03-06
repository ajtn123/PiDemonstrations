function chudnovsky(terms, digits) {
  BigNumber.set({ DECIMAL_PLACES: digits });
  let C = new BigNumber(426880).times(new BigNumber(10005).sqrt()),
    M = new BigNumber(1),
    L = new BigNumber(13591409),
    X = new BigNumber(1),
    K = new BigNumber(6),
    S = new BigNumber(13591409);

  for (let k = 1; k < terms; k++) {
    M = K.pow(3)
      .minus(K.times(16))
      .times(M)
      .div(k ** 3);
    L = L.plus(545140134);
    X = X.times(-262537412640768).times(1000);
    K = K.plus(12);
    S = S.plus(M.times(L).div(X));
  }

  let pi = C.div(S).toFixed(digits);
  return pi;
}

function generateSeriesExpansion(terms) {
  let series = "";
  for (let k = 0; k < terms; k++) {
    const term = `\\frac{(-1)^${k} (6*${k})! (545140134*${k} + 13591409)} {(3*${k})! (${k}!)^3 (640320)^{3*${k} + \\frac{3}{2}}}`;
    series += term;
    if (k < terms - 1) series += " + ";
  }
  return `\\[ \\frac{1}{\\pi} = 12 \\left( ${series} \\right) \\] `;
}

function updatePi() {
  const terms = parseInt(document.getElementById("terms").value);
  const digits = parseInt(document.getElementById("digits").value);
  document.getElementById("expansion").innerHTML = generateSeriesExpansion(terms);
  MathJax.typeset();
  document.getElementById("termCount").innerText = terms;
  document.getElementById("digitCount").innerText = digits;
  document.getElementById("piValue").innerText = chudnovsky(terms, digits);
}

function updateFormula() {
  document.getElementById("formula").innerHTML = "\\[ \\frac{1}{\\pi} = 12 \\sum_{k=0}^{\\infty} \\frac{(-1)^k (6k)! (545140134k + 13591409)} {(3k)! (k!)^3 (640320)^{3k + \\frac{3}{2}}} \\]";
  MathJax.typeset();
}

updateFormula();
updatePi();

document.getElementById("terms").addEventListener("input", updatePi);
document.getElementById("digits").addEventListener("input", updatePi);
