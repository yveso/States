var svg = document.getElementById("svg");

var stateChecklist = {};

for (var i in trips) {
  for (var j in trips[i].states) {
    var state = trips[i].states[j];
    if(!stateChecklist[state]) {
      stateChecklist[state] = 1;
    } else {
      stateChecklist[state]++;
    }
  }
}

for(var i in states) {
  //console.log(states[i].id);
  var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
  p.setAttribute("d", states[i].path);
  p.setAttribute("id", states[i].id);
  p.style.stroke = "#000";
  p.style.strokeWidth = "1px";
  p.style.fill = stateChecklist[states[i].id] ? "#FF0000" : "#FFF";

  p.onclick = function (e) {
    console.log(e.target.id);
  };

  svg.appendChild(p);
}