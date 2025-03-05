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
