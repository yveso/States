var svgMap = document.getElementById("svgMap");

var stateChecklist = {};

for (var i in trips) {
  for (var j in trips[i].states) {
    var state = trips[i].states[j];
    if (!stateChecklist[state]) {
      stateChecklist[state] = 1;
    } else {
      stateChecklist[state]++;
    }
  }
}

for (var i in statesMapData) {
  //console.log(statesMapData[i].id);
  var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
  p.setAttribute("d", statesMapData[i].path);
  p.setAttribute("id", statesMapData[i].id);
  p.style.stroke = "#000";
  p.style.strokeWidth = "1px";
  p.style.fill = stateChecklist[statesMapData[i].id] ? "#F00" : "#FFF";

  p.onclick = function (e) {
    console.log(e.target.id);
  };

  svgMap.appendChild(p);
}