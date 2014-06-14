(function watchout(){
  var numEnemies = 5;
  var svg = d3.select("body").append("svg")
    .attr("width", 700)
    .attr("height", 450);



// encapsulate draw enemies into a function
  //takes random start positions as first data
  //
  var drawEnemies = function(numEnemies) {
    var positions = [];
    for(var i = 0; i < numEnemies; i++) {
      positions.push({x: Math.random() * 675, y: Math.random() * 425});
    }
    d3.select("svg").selectAll("circle").data(positions).enter().append("circle")
      .attr("cx", function(d){ return d.x;})
      .attr("cy", function(d) { return d.y;})
      .attr("r", 10)
      .attr("class", "enemy");
  };
  drawEnemies(numEnemies);

  var moveEnemies = function(){
    var newPositions = [];
    for(var i = 0; i < numEnemies; i++) {
      newPositions.push({x: Math.random() * 700, y: Math.random() * 450});
    }
    d3.selectAll(".enemy").data(newPositions)
      .transition()
      .duration(200)
      .attr("cx", function(d){ return d.x;})
      .attr("cy", function(d) { return d.y;})
  };

  setInterval(moveEnemies, 1000);

  var makeHero = function(){
    d3.select("svg").selectAll("insertHere").data([{x: 350, y:225}])
      .enter().append("circle")
      .attr("cx", function(d){ return d.x;})
      .attr("cy", function(d){ return d.y;})
      .attr("r", 10).attr("fill", "blue")
      .attr("class", "hero");
  };

  makeHero();
// encapsulate player create into a function
  // give player some kind of 'on() do()' function

// collision detection

// keep track of user score

})();
