console.log(`Добро пожаловать. В данном проекте была реализована школьная игра моего детства "быки-коровы". Вероятно, у игры много других альтернативных названий, которые вам более знакомы.
Что надо делать? Игра состоит в том, что надо отгадать пароль. Пароль состоит из 5 уникальных цифр. При вводе комбинации - выдается 2 чилса. Х или быки - это число цифр в пароле, которые есть в искомом пароле и находятся на своих местах.
Y или коровы это число цифр, которые присутствуют в пароле, но находятся не на своих местах. Всего дается 12 попыток на то чтобы вычислить пароль исходя из данных по X и Y (быкам и коровам).
Помимо этого - есть лимит по времени. Лимит по времени задается в исходных настройках при выборе уровня сложности. Чем меньше времени, тем сложнее. Паролей всего 12. После каждого угаданного пароля, время на прохождение следующего уровня уменьшается.
Легенда состоит в том, что вы закрыти в комнате и вас держит там маньяк, который пока вы угадываете - заполняет комнату водой. Вода реализована схематично в виде нарастающего синего блока, который заполняет экран.
В игре ведется учет как вашей статистики при прохождении разных уровней внутри одной игры, так и статистика по играм в целом. В целом, потрачено довольно много времени на реализацию всего на хорошем уровне, поэтому прошу не пинать по мелочам)
Пароли можно вводить как мышкой, так и с клавиатуры.
Для удобства проверки - правльным пароль выводится в консоли. После 12 уровня - игрок информируется об окончании игры и игра обнуляется. 
В игре есть небольшие звуковые сопровождения основных событий - звуки капающей воды, смех при неугаданном пароле, плач при угаданном пароле.
`)
window.addEventListener("load", generatepass);

window.addEventListener("load", function () {
  document.documentElement.style.setProperty("--hideinstructions", retrieveInstructions());
  if (retrieveInstructions() == "none"){document.documentElement.style.setProperty("--disablescroll", "auto");}
  else{document.documentElement.style.setProperty("--disablescroll", "hidden");}
});


var stats = retrieveStats();

document.getElementById("begin").style.display = "block";
document.getElementById("quitgame").style.display = "none";

const defaulthint = "Try a number to see if it fits...";

var attempts = [
  "First",
  "Second",
  "Third",
  "fourth",
  "Fifth",
  "Sixth",
  "Seventh",
  "Eighth",
  "Ninth",
  "Tenth",
  "Eleventh",
  "Last",
];

var levels = ["easy", "moderate", "hard", "nightmare"];
var duration = [20, 15, 10, 5];

document.getElementById("name").focus();

var d1 = document.getElementById("d1");
var d2 = document.getElementById("d2");
var d3 = document.getElementById("d3");
var d4 = document.getElementById("d4");
var d5 = document.getElementById("d5");

document.getElementById("name").placeholder = retrieveName();
document.getElementById("name").value = retrieveName();
document.getElementById("play").addEventListener("click", initialize);

window.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    window.removeEventListener("keydown", initialize, true);
    initialize();
  }
});

function initialize() {
  if (
    document.getElementById("name").value == "" ||
    document.getElementById("name").value.indexOf("-") != -1
  ) {
    alert("Please enter your name first");
  } else {
    document.documentElement.style.setProperty("--hidecover", "none");
    document.documentElement.style.setProperty("--disablescroll", "auto");
    document.getElementById("welcomename").innerHTML =
      document.getElementById("name").value;
    saveName(document.getElementById("name").value);
  }
  var difficulty = document.getElementById("difficulty").value;
  time = duration[levels.indexOf(difficulty)];
  document.getElementById("time").innerHTML = time;
  resettimer();
}

var buttons = document.querySelectorAll(".button");
buttons.forEach((element) =>
  element.addEventListener("click", function () {
    element.style.animation = "press 0.3s 1";
    element.style.animationPlayState = "running";
    setTimeout(() => {
      element.style.animationPlayState = "paused";
      element.style.animation = "";
    }, 1000);
  })
);

document.getElementById("gamename").addEventListener("click", function () {
  document.documentElement.style.setProperty("--hidecover", "flex");
  document.documentElement.style.setProperty("--disablescroll", "hidden");
});

document
  .getElementById("closeinstructions")
  .addEventListener("click", function () {
    document.documentElement.style.setProperty("--hideinstructions", "none");
    document.documentElement.style.setProperty("--disablescroll", "auto");
  });

document.getElementById("howtoplay").addEventListener("click", function () {
  document.documentElement.style.setProperty("--hideinstructions", "flex");
  document.documentElement.style.setProperty("--disablescroll", "hidden");
});

document.getElementById("skip").addEventListener("click", function () {
  document.documentElement.style.setProperty("--hideinstructions", "none");
  document.documentElement.style.setProperty("--disablescroll", "auto");
  saveInstructions("none");
});

document.getElementById("roomhistory").addEventListener("click", function () {
  document.documentElement.style.setProperty("--hideroomhistory", "flex");
  document.documentElement.style.setProperty("--disablescroll", "hidden");
});

document
  .getElementById("closeroomhistory")
  .addEventListener("click", function () {
    document.documentElement.style.setProperty("--hideroomhistory", "none");
    document.documentElement.style.setProperty("--disablescroll", "auto");
  });

document.getElementById("gamestats").addEventListener("click", function () {
  updateStats();
  if(document.getElementById("stats").getElementsByTagName("tr").length > 1){
    document.getElementById("norecords").style.display = "none";
  }
  else{
    document.getElementById("norecords").style.display = "block";
  }
  document.documentElement.style.setProperty("--hidegamestats", "flex");
  document.documentElement.style.setProperty("--disablescroll", "hidden");
});

document
  .getElementById("closegamestats")
  .addEventListener("click", function () {
    document.documentElement.style.setProperty("--hidegamestats", "none");
    document.documentElement.style.setProperty("--disablescroll", "auto");
  });

document.getElementById("closeprize").addEventListener("click", function () {
  document.documentElement.style.setProperty("--hideprize", "none");
  document.documentElement.style.setProperty("--disablescroll", "auto");
});

document.getElementById("begin").addEventListener("click", startgame);
document.getElementById("retry").addEventListener("click", retry);
document.getElementById("quitgame").addEventListener("click", endgame);

function startgame() {
  var audio = new Audio("assets/audio/water.mp3");
  audio.play(); audio.loop = true;
  document.getElementById("pass").addEventListener("click", function(){
    audio.pause();
    audio.currentTime = 0;});
  stats.name.push(document.getElementById("name").value);
  stats.date.push(getTimestamp());
  saveStats(stats);
  updateStats();
  document.getElementById("begin").style.display = "none";
  document.getElementById("quitgame").style.display = "block";

  var timesetting = Number(document.getElementById("time").innerHTML);
  var maxtime = timesetting * 60;
  var time = maxtime;
  var m1 = document.getElementById("m1");
  var m2 = document.getElementById("m2");
  var s1 = document.getElementById("s1");
  var s2 = document.getElementById("s2");
  const roomnum = Number(
    document.getElementById("roomnum").innerHTML.split(" ")[1]
  );

  var countdown = setInterval(updatetime, 1000);

  function updatetime() {
    time--;
    var minutes = Math.floor(time / 60);
    var seconds = Math.round((time / 60 - minutes) * 60);

    minutes = minutes.toString();
    if (minutes.length < 2) {
      minutes = "0" + minutes;
    }
    seconds = seconds.toString();

    if (seconds.length < 2) {
      seconds = "0" + seconds;
    }
    m1.innerHTML = minutes[0];
    m2.innerHTML = minutes[1];
    s1.innerHTML = seconds[0];
    s2.innerHTML = seconds[1];
    if (time < 0.2 * maxtime) {
      document.documentElement.style.setProperty("--timer", "rgb(176, 0, 0)");
    }

    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const pageheight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight,
    document.documentElement.clientHeight);

    //console.log(vh, pageheight);
    const bottom = vh-pageheight;
    document.documentElement.style.setProperty(
      "--bottom", bottom + "px");

    document.documentElement.style.setProperty(
      "--waterlevel",
      (1- time / maxtime) * pageheight + "px");
    if (time == 0 || countAttempts() == 13) {
      clearInterval(countdown);
      failmessage();
    }
    if (
      roomnum !=
      Number(document.getElementById("roomnum").innerHTML.split(" ")[1])
    ) {
      clearInterval(countdown);
      resettimer();
      resethints();
    }

    if (document.getElementById("begin").style.display == "block") {
      clearInterval(countdown);
      resettimer();
      resethints();
      document.documentElement.style.setProperty("--waterlevel", 0+"px");
    }
  }

  document.getElementById("enter").focus();
  listen("active");
}

function failmessage() {
  document.documentElement.style.setProperty("--hideendgame", "flex");
  document.documentElement.style.setProperty("--disablescroll", "hidden");
  endgame();
}

function endgame() {
  var audio = new Audio("assets/audio/endgame.wav");
  audio.play();
  document.getElementById("pass").click();
  stats.roomscompleted.push(0);
  stats.attemptsperroom.push(countAttempts());
  var consumed = addRoomHistory("failed");
  stats.timeperroom.push(consumed);
  saveStats(stats);
  updateStats();
  document.getElementById("begin").style.display = "block";
  document.getElementById("quitgame").style.display = "none";
  clear(); //reset display
  resethints(); //reset hints
  resettimer(); //resetting timer
  generatepass(); //generating new code
  listen("abort"); //turning off button clicks
  document.getElementById("roomnum").innerHTML = "Room 1"; //resetting to room 1
  document.body.style.backgroundImage = `url(assets/1.jpg)`; //resetting background to room 1
  document.documentElement.style.setProperty("--waterlevel", 0+"px"); //restoring water level
  document.documentElement.style.setProperty(
    "--timer",
    "rgba(36, 28, 28, 0.85)"
  );
}

function retry() {
  document.documentElement.style.setProperty("--hideendgame", "none");
  document.documentElement.style.setProperty("--disablescroll", "auto");
}

function listen(status) {
  for (var i = 0; i < 10; i++) {
    var k = document.getElementById(`k${i}`);
    if (status == "abort") {
      k.removeEventListener("click", handleclicks, true);
    } else if (status == "active") {
      k.addEventListener("click", handleclicks, true);
    }
  }

  var reset = document.getElementById("reset");
  var enter = document.getElementById("enter");

  if (status == "active") {
    reset.addEventListener("click", clear, true);
    enter.addEventListener("click", checkkey, true);
    window.addEventListener("keydown", handleentries, true);
  } else if (status == "abort") {
    reset.removeEventListener("click", clear, true);
    enter.removeEventListener("click", checkkey, true);
    window.removeEventListener("keydown", handleentries, true);
  }
}

//HANDLING BUTTON CLICKS AND KEYBOARD ENTRIES

var handleclicks = function clickbutton(e) {
  entry = e.target.innerHTML;
  var next = nextposition();
  var repeats = checkrepeats(entry);
  if (next <= 5) {
    if (repeats == "false") {
      display(entry, next);
    } else if (repeats == "true") {
      alert("The digits should not repeat");
    }
  }
};

var handleentries = function buttonpress(e) {
  var entry = e.key;
  if ((entry >= 0) & (entry <= 9)) {
    var next = nextposition();
    var repeats = checkrepeats(entry);
    if (next <= 5) {
      if (repeats == "false") {
        display(entry, next);
      } else {
        alert("The digits should not repeat");
      }
    }
  }
  if (entry == "r") {
    clear();
  } else if (entry == "Enter") {
    checkkey();
  }
};

//till here

function nextposition() {
  for (var i = 1; i <= 5; i++) {
    var digit = document.getElementById(`d${i}`).innerHTML;
    //console.log(digit);
    if (digit == "#") {
      //console.log(i);
      return i;
    }
  }
  return 6;
}

function checkrepeats(entry) {
  for (var i = 1; i <= 5; i++) {
    var digit = document.getElementById(`d${i}`).innerHTML;
    if (entry == digit) {
      return "true";
    }
  }
  return "false";
}

function display(entry, next) {
  document.getElementById(`d${next}`).innerHTML = entry;
  document.getElementsByClassName("space")[0].className = "filled";
}

function clear() {
  d1.innerHTML = "#";
  d2.innerHTML = "#";
  d3.innerHTML = "#";
  d4.innerHTML = "#";
  d5.innerHTML = "#";
  d1.className = "space";
  d2.className = "space";
  d3.className = "space";
  d4.className = "space";
  d5.className = "space";
  keyentry = [];
}

function generatepass() {
  //console.log("generating");
  var pass = [];
  var digit;
  for (var i = 0; i < 5; i++) {
    digit = Math.floor(Math.random() * 10);
    if (pass.indexOf(digit) == -1) {
      pass.push(digit);
    } else {
      i = i - 1;
    }
  }
  document.getElementById("pass").innerHTML = pass;
  console.log(pass);
}

function checkkey() {
  if (nextposition() > 5) {
    keyentry = [];
    for (var i = 1; i <= 5; i++) {
      keyentry.push(Number(document.getElementById(`d${i}`).innerHTML));
    }
    pass = document.getElementById("pass").innerHTML.split(",").map(Number);
    var X = 0;
    var Y = 0;
    for (var i = 0; i < 5; i++) {
      if (pass.indexOf(keyentry[i]) != -1) {
        if (pass.indexOf(keyentry[i]) == i) {
          X = X + 1;
        } else {
          Y = Y + 1;
        }
      }
    }
    if (X == 5) {
      if (
        Number(document.getElementById("roomnum").innerHTML.split(" ")[1]) == 12
      ) {
        document.documentElement.style.setProperty("--hideprize", "flex");
        document.documentElement.style.setProperty("--disablescroll", "hidden");
      }
      newround();
      return;
    }
    if(X>=3){
      var audio = new Audio("assets/audio/1.mp3");
      audio.play();}
    else{
      var audio = new Audio("assets/audio/2.mp3");
      audio.play();
    }
    document.getElementsByClassName("filled")[0].style.animationPlayState =
      "running";
    document.getElementsByClassName("filled")[1].style.animationPlayState =
      "running";
    document.getElementsByClassName("filled")[2].style.animationPlayState =
      "running";
    document.getElementsByClassName("filled")[3].style.animationPlayState =
      "running";
    document.getElementsByClassName("filled")[4].style.animationPlayState =
      "running";
    //console.log("X=", X);
    //console.log("Y=", Y);
    showhint(keyentry, X, Y);
    document.getElementsByClassName("hints")[0].scrollTop =
      document.getElementsByClassName("hints")[0].scrollHeight;
    if (countAttempts() < 12) {
      setTimeout(() => {
        document.getElementsByClassName("filled")[0].style.animationPlayState =
          "paused";
        document.getElementsByClassName("filled")[1].style.animationPlayState =
          "paused";
        document.getElementsByClassName("filled")[2].style.animationPlayState =
          "paused";
        document.getElementsByClassName("filled")[3].style.animationPlayState =
          "paused";
        document.getElementsByClassName("filled")[4].style.animationPlayState =
          "paused";
        clear();
      }, 1000);
    }
  } else {
    alert("Your key is too short.");
  }
}

function showhint(keyentry, X, Y) {
  if (document.getElementById(`h1`).innerHTML == defaulthint) {
    document.getElementById(`h1`).innerHTML = "";
  }
  for (var i = 1; i <= 12; i++) {
    var hint = document.getElementById(`h${i}`).innerHTML;
    keyentry = keyentry.toString().split(",").join(" ");
    if (hint.length == 0) {
      document.getElementById(`h${i}`).innerHTML =
        attempts[i - 1] + " attempt: " + keyentry;

      var clue = "X is " + X + "; Y is " + Y + ";";

      var hintdetail = document.createElement("span");
      hintdetail.classList.add("hintdetail");
      var hintdetailtext = document.createTextNode(clue);
      hintdetail.appendChild(hintdetailtext);
      document.getElementById(`h${i}`).appendChild(hintdetail);

      return;
    }
  }
}

function newround() {
  var audio = new Audio("assets/audio/levelcomplete.mp3");
  audio.play();
  document.getElementById("pass").click();
  stats.roomscompleted.push(
    Number(document.getElementById("roomnum").innerHTML.split(" ")[1])
  );
  stats.attemptsperroom.push(countAttempts());
  clear(); //reset display
  var consumed = addRoomHistory("success"); //saving room history and returning timeconsumed
  stats.timeperroom.push(consumed);
  saveStats(stats);
  updateStats();
  resethints(); //reset hints
  resettimer(); //resetting timer
  generatepass(); //generating new pass
  listen("abort"); //turning off button clicks
  document.getElementById("begin").style.display = "block";
  document.getElementById("quitgame").style.display = "none";
  document.documentElement.style.setProperty(
    "--timer",
    "rgba(36, 28, 28, 0.85)"
  );
  var roomnum = document.getElementById("roomnum").innerHTML.split(" ")[1];
  roomnum++;
  document.documentElement.style.setProperty("--waterlevel", 0+"px");
  if(roomnum<=12){
    document.body.style.backgroundImage = `url(assets/${roomnum}.jpg)`;
    document.getElementById("roomnum").innerHTML = "Room " + roomnum;}
  else{
    document.body.style.backgroundImage = `url(assets/1.jpg)`;
    document.getElementById("roomnum").innerHTML = "Room 1";}
  var red = Math.floor(Math.random() * 100);
  var green = Math.floor(Math.random() * 100);
  var blue = Math.floor(Math.random() * 100);
  var panecolor = `rgb(${red}, ${green}, ${blue})`;
  //console.log(panecolor);
  document.documentElement.style.setProperty("--rightpanebg", panecolor);
}

function addRoomHistory(result) {
  var timeconsumed = timeConsumed();
  var consumed = Number(timeconsumed[0]) * 60 + Number(timeconsumed[1]);
  var roomnum = document.getElementById("roomnum").innerHTML.split(" ")[1];
  var attempts = countAttempts();
  if (result == "success") {
    document.getElementById(`r${roomnum}`).innerHTML =
      `<span id="red"><b>Room` +
      roomnum +
      `</b></span>: Completed in <span id="red">` +
      timeconsumed[0] +
      `</span> minutes and <span id="red">` +
      timeconsumed[1] +
      `</span> seconds. The key was discovered after <span id="red">` +
      attempts +
      "</span> attempt(s).";
  } else {
    document.getElementById(`r${roomnum}`).innerHTML =
      `<span id="red"><b>Room` + roomnum + `</b></span>: failed.`;
  }
  return consumed;
}

function countAttempts() {
  for (var i = 1; i <= 12; i++) {
    if (
      document.getElementById(`h${i}`).innerHTML == "" ||
      document.getElementById(`h${i}`).innerHTML ==
        "Try a number to see if it fits..."
    ) {
      return i - 1;
    }
  }
  return i;
}

function getTimestamp() {
  var year = new Date().getFullYear();
  var month = new Date().getMonth();
  var date = new Date().getDate();
  var hours = new Date().getHours();
  if (hours < 10) {
    hours = "0" + hours.toString();
  }
  var minutes = new Date().getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes.toString();
  }
  var timestamp = hours + ":" + minutes + " " + date + "/" + month + "/" + year;
  return timestamp;
}
function timeConsumed() {
  var timesetting = Number(document.getElementById("time").innerHTML) * 60;
  var m1 = Number(document.getElementById("m1").innerHTML);
  var m2 = Number(document.getElementById("m2").innerHTML);
  var s1 = Number(document.getElementById("s1").innerHTML);
  var s2 = Number(document.getElementById("s2").innerHTML);
  var remained = m1 * 10 * 60 + m2 * 60 + s1 * 10 + s2;
  var consumed = timesetting - remained;
  var consumedmin = Math.floor(consumed / 60);
  var consumedsec = consumed - consumedmin * 60;
  return [consumedmin, consumedsec];
}

function resethints() {
  //console.log("resetting hints");
  for (var i = 1; i <= 12; i++) {
    document.getElementById(`h${i}`).innerHTML = "";
  }
  document.getElementById(`h1`).innerHTML = defaulthint;
  //console.log("reset complete");
}

function resettimer() {
  //console.log("resetting timer");
  var timesetting = Number(document.getElementById("time").innerHTML);
  var roomnum = Number(
    document.getElementById("roomnum").innerHTML.split(" ")[1]
  );
  var maxtime =
    timesetting * 60 - ((0.05 * (roomnum - 1)) / 12) * timesetting * 60;
  document.getElementById("time").innerHTML = Math.floor(maxtime) / 60;
  //console.log(document.getElementById("time").innerHTML);

  var minutes = Math.floor(maxtime / 60);
  var seconds = maxtime - minutes * 60;

  minutes = minutes.toString();
  if (minutes.length < 2) {
    minutes = "0" + minutes;
  }
  seconds = seconds.toString();

  if (seconds.length < 2) {
    seconds = "0" + seconds;
  }
  var m1 = document.getElementById("m1");
  var m2 = document.getElementById("m2");
  var s1 = document.getElementById("s1");
  var s2 = document.getElementById("s2");

  m1.innerHTML = minutes[0];
  m2.innerHTML = minutes[1];
  s1.innerHTML = seconds[0];
  s2.innerHTML = seconds[1];
}

document.getElementById("welcomename").innerHTML = "Player";

//Memorize user states

function saveInstructions(showinstructions) {
  localStorage.setItem("instructions", showinstructions);
}

function saveName(name) {
  localStorage.setItem("name", name);
}

function saveStats(stats) {
  //console.log(stats);
  localStorage.setItem("stats", JSON.stringify(stats));
}

//Restore states after reloading

function retrieveInstructions() {
  if (localStorage.getItem("instructions")) {
    const instructions = localStorage.getItem("instructions");
    return instructions;
  } else {
    return "flex";
  }
}

function retrieveName() {
  if (localStorage.getItem("name")) {
    const name = localStorage.getItem("name");
    return name;
  } else {
    return "-----";
  }
}

function retrieveStats() {
  if (localStorage.getItem("stats")) {
    var stats = localStorage.getItem("stats");
    stats = JSON.parse(stats);
    return stats;
  } else {
    stats = {};
    stats.name = [];
    stats.date = [];
    stats.roomscompleted = [];
    stats.attemptsperroom = [];
    stats.timeperroom = [];
    return stats;
  }
}

// Building statistics

function updateStats() {

  var gamestart = 0;
  var savedstats = {};
  var records = {};
  records.name = [];
  records.date = [];
  records.roomscompleted = [];
  records.timeperroom = [];
  records.attemptsperroom = [];

  savedstats = retrieveStats();
  if (savedstats.name != undefined) {
    savedstatsnum = savedstats.name.length;
  } else {
    return;
  }
  for (var i = 0; i < savedstatsnum; i++) {
    if (savedstats.roomscompleted[i] == 0 && i == 0) {
      records.name.push(savedstats.name[i]);
      records.date.push(savedstats.date[i]);
      records.roomscompleted.push(0);
      records.timeperroom.push("-");
      records.attemptsperroom.push(savedstats.attemptsperroom[i]);
    }  if (savedstats.roomscompleted[i] < savedstats.roomscompleted[i-1]) {
      records.name.push(savedstats.name[gamestart]);
      records.date.push(savedstats.date[gamestart]);
      records.roomscompleted.push(savedstats.roomscompleted[i - 1]);
      var timeperroom = 0;
      var attemptsperroom = 0;
      for (var j = gamestart; j < i; j++) {
        timeperroom = timeperroom + Number(savedstats.timeperroom[j]);
        attemptsperroom =
          attemptsperroom + Number(savedstats.attemptsperroom[j]);
      }
      timeperroom = Math.floor(timeperroom / (i - gamestart));
      attemptsperroom = Math.floor(attemptsperroom / (i - gamestart));

      records.timeperroom.push(timeperroom);
      records.attemptsperroom.push(attemptsperroom);
    } 
    if (savedstats.roomscompleted[i] == 0){
      records.name.push(savedstats.name[i]);
      records.date.push(savedstats.date[i]);
      records.roomscompleted.push(0);
      records.timeperroom.push(savedstats.timeperroom[i]);
      records.attemptsperroom.push(savedstats.attemptsperroom[i]);
    }
    if (savedstats.roomscompleted[i] == 1) {
      gamestart = i;
    }
  }
  //console.log(records);
  fillStats(records);
}

function fillStats(records){
  var len = records.name.length;

  var headers = document.getElementById("stats").getElementsByTagName("tr")[0].outerHTML;
  document.getElementById("stats").innerHTML = document.getElementById("stats").getElementsByTagName("tr")[0].outerHTML; //clearing stats table
  var table = document.getElementById("stats");

  for(var i=0; i<len; i++){
  var row = document.createElement("tr");
  
  var statsnameentry = document.createElement("td");
  statsnameentry.appendChild(document.createTextNode(records.name[i]));
  row.appendChild(statsnameentry);

  var statsdateentry = document.createElement("td");
  statsdateentry.appendChild(document.createTextNode(records.date[i]));
  row.appendChild(statsdateentry);

  var statsroomscompletedentry = document.createElement("td");
  statsroomscompletedentry.appendChild(
    document.createTextNode(records.roomscompleted[i])
  );
  row.appendChild(statsroomscompletedentry);

  var statsattemptsperroomentry = document.createElement("td");
  statsattemptsperroomentry.appendChild(
    document.createTextNode(records.attemptsperroom[i])
  );
  row.appendChild(statsattemptsperroomentry);

  var statstimeperroomentry = document.createElement("td");
  statstimeperroomentry.appendChild(
    document.createTextNode(records.timeperroom[i])
  );
  row.appendChild(statstimeperroomentry);
  
  table.appendChild(row);

  }

}

