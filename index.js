function updateTime() {
  const now = new Date();

  // Pi Day
  if (now.getMonth() === 2 && now.getDate() === 14) {
    document.getElementById("date").innerHTML = "<h1>Happy π Day</h1>";
    return;
  }

  // Current Time
  document.getElementById("current-time").textContent = `Current Time: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

  // Lasr Pi Day
  let piDayEnd = new Date(now.getFullYear(), 2, 15);
  let timePassed = now - piDayEnd;
  if (timePassed < 0) {
    piDayEnd.setFullYear(now.getFullYear() - 1);
    timePassed = now - piDayEnd;
  }
  const [dayP, hourP, minuteP, secondP] = diffTime(timePassed);
  document.getElementById("time-since-pi").textContent = `Time since Pi Day: ${dayP}d ${hourP}h ${minuteP}m ${secondP}s`;
  document.getElementById("bar").value = timePassed;

  // Next Pi Day
  let piDay = new Date(now.getFullYear(), 2, 14);
  let timeRemaining = piDay - now;
  if (timeRemaining < 0) {
    piDay.setFullYear(now.getFullYear() + 1);
    timeRemaining = piDay - now;
  }
  const [days, hours, minutes, seconds] = diffTime(timeRemaining);
  document.getElementById("time-until-pi").textContent = `Time until Pi Day: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function diffTime(timeDiff) {
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  return [days, hours, minutes, seconds];
}

updateTime();
// Update time every second
setInterval(updateTime, 1000);

const correctPi =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989";

function highlightPiDiff(approxPi) {
  let highlighted = "";
  for (let i = 0; i < correctPi.length && i < approxPi.length; i++) {
    if (correctPi[i] === approxPi[i]) {
      highlighted += correctPi[i]; // Keep correct
    } else {
      highlighted += `<span style="background-color:#ff00003f">${correctPi[i] || " "}</span>`; // Highlight incorrect
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

function checkPi() {
  const input = document.getElementById("mPi").innerText;
  document.getElementById("aPi").innerHTML = highlightPiDiff(input);
  document.getElementById("correctDigits").innerText = checkDigits(input);
}

checkPi();
document.getElementById("mPi").addEventListener("input", checkPi);
