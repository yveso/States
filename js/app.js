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


