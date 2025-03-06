const correctPi =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989";

function highlightPiDiff(approxPi) {
  let highlighted = "";
  for (let i = 0; i < correctPi.length && i < approxPi.length; i++) {
    if (correctPi[i] === approxPi[i]) {
      highlighted += correctPi[i]; // Keep correct
    } else {
      highlighted += `<span style="background-color:#ff00003f">${approxPi[i] || " "}</span>`; // Highlight incorrect
    }
  }
  return highlighted;
}

function checkDigits(approxPi) {
  let correctDigits = -1;
  for (let i = 0; i < correctPi.length && i < approxPi.length; i++) {
    if (correctPi[i] === approxPi[i]) {
      correctDigits += 1;
    } else {
      break;
    }
  }
  return correctDigits;
}

function chudnovsky(terms, digits) {
  const start = performance.now(); // Time started.

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

  const pi = C.div(S).toFixed(digits);

  const timeUsed = (performance.now() - start).toFixed(1); // Time used by the calculation.

  return [pi, timeUsed];
}

function generateSeriesExpansion(terms) {
  let series = "";
  for (let k = 0; k < terms; k++) {
    const term = `\\frac{(-1)^${k} (6 \\times ${k})! (545140134 \\times ${k} + 13591409)} {(3 \\times ${k})! (${k}!)^3 (640320)^{3 \\times ${k} + \\frac{3}{2}}}`;
    series += term;
    if (k < terms - 1) series += " + ";
  }
  return `\\[ \\frac{1}{\\pi} = 12 \\left( ${series} \\right) \\]`;
}

let lastTerm = 0;
function updatePi() {
  const terms = parseInt(document.getElementById("terms").value);
  const showError = document.getElementById("showError").checked;

  if (terms !== lastTerm) {
    document.getElementById("expansion").innerHTML = generateSeriesExpansion(terms);
    MathJax.typeset();
  }
  document.getElementById("termCount").innerText = terms;
  const [pi, timeUsed] = chudnovsky(terms, 1000);
  document.getElementById("piValue").innerHTML = showError ? highlightPiDiff(pi) : pi;
  document.getElementById("timeUsed").innerText = timeUsed;
  document.getElementById("correctDigits").innerText = checkDigits(pi);
  lastTerm = terms;
}

function updateFormula() {
  document.getElementById("formula").innerHTML =
    "\\[ \\frac{1}{\\pi} = 12 \\sum_{k=0}^{\\infty} \\frac{(-1)^k (6k)! (545140134k + 13591409)} {(3k)! (k!)^3 (640320)^{3k + \\frac{3}{2}}} \\]";
  MathJax.typeset();
}

updateFormula();
updatePi();

document.getElementById("terms").addEventListener("input", updatePi);
document.getElementById("digits").addEventListener("input", updatePi);
document.getElementById("showError").addEventListener("input", updatePi);
