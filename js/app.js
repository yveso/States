var statesWithCount = function (states, trips) {
  var retVal = [];

  for (var i = 0; i < states.length; i++) {
    var short = states[i].id;
    var count = 0;

    for (var t in trips) {
      if (trips[t].states.indexOf(short) !== -1) {
        count++;
      }
    }

    retVal.push({ state: states[i], count: count });
  }

  return retVal;
} (states, trips);

var circles = function (data) {
  var radius = 40;
  var width = 1000;
  
  var paddedDiameter = 2 * radius + 4;
  var circlesAcross = Math.floor(width / paddedDiameter);
  var height = Math.ceil(data.length / circlesAcross) * paddedDiameter;
  
  var xPos = function (d, i) {
    var x = i % circlesAcross;
    return radius + x * paddedDiameter;
  };
  
  var yPos = function (d, i) {
    var y = Math.floor(i / circlesAcross);
    return radius + y * paddedDiameter;
  };
  
  var color = d3.scale.linear()
    .domain([0, d3.max(data, function(i) { return i.count; }) ])
    .range(["white", "red"])
    .interpolate(d3.interpolateLab);
  
  var grayOrWhite = function (d) {
    return d.count > 0 ? "#FFF" : "#c0c0c0";
  }
  
  var svg = d3.select("#circles")
    .attr("width", width)
    .attr("height", height);
  
  var g = svg.selectAll("g")
    .data(data)
    .enter()
    .append("g");  
  g.append("circle")
    .attr("cx", xPos)
    .attr("cy", yPos)
    .attr("r", radius)
    .attr("fill", function (d) { return color(d.count); });  
  g.append("circle")
    .attr("cx", xPos)
    .attr("cy", yPos)
    .attr("r", radius - 5)
    .attr("fill", "none")
    .attr("stroke", grayOrWhite)
    .attr("stroke-width", 1);  
  g.append("text")
    .attr("x", xPos)
    .attr("y", function (d, i) { return yPos(d, i) + radius / 5; })
    .attr("stroke", grayOrWhite)
    .attr("fill", "none")
    .attr("stroke-width", 1)
    .attr("font-size", radius * 0.9)
    .attr("text-anchor", "middle")
    .text(function (data) { return data.state.id });
} (statesWithCount);


var shareVisited = function (data) {
  var width = 1000;
  var height = width / 2;
  var radius = Math.floor(height * 0.5);
  
  var yes = { val: "Yes", count: 0 };
  var no = { val: "No", count: 0 };
  
  var visited = false;
  for (var i = 0; i < states.length; i++) {
    visited = false;
    for (var t in trips) {
      if(trips[t].states.indexOf(states[i].id) !== -1) {
        visited = true;
        break;
      }
    }
    if(visited) { 
      yes.count++; 
    } else { 
      no.count++;
    }
  }
  var shares = [yes, no];
  
  var svg = d3.select("#share")
    .attr("width", width)
    .attr("height", height);
  
  var pieLayout = d3.layout.pie()
    .value(function (d) { return d.count; });
  
  var arc = d3.svg.arc()
    .outerRadius(radius - 5)
    .innerRadius(0);
  
  var g = svg.selectAll("g")
    .data(pieLayout(shares))
    .enter().append("g")
    //.attr("stroke", "#FFF")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");  
  g.append("path")
    .attr("d", arc)
    .attr("fill", function (d) {
      return d.data.val === "Yes" ? "#0F0" : "#F00";
    });
    g.append("text")
   .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
   .text(function (d) { return d.data.val; });
} (statesWithCount);
