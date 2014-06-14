(function watchout(){
  var numEnemies = 5;

  function click(){
    if (d3.event.defaultPrevented) return;
    var point = d3.mouse(this);
    var p = {x: point[0], y: point[1]};
  }

  var dragmove = function(d){
    var x = d3.event.x;
    var y = d3.event.y;
    d3.select(this).attr("cx", x);
    d3.select(this).attr("cy", y);
  };
  var drag = d3.behavior.drag().on("drag", dragmove);

  var svg = d3.select("body").append("svg")
    .attr("width", 700)
    .attr("height", 450)
    .on("click", click)

//d3.selectAll(.enemy).each(function(){})??

  var collide = function(){
    d3.selectAll(".enemy").attr("cx", function(d){
      var heroX = d3.select(".hero").attr("cx");
      var heroY = d3.select(".hero").attr("cy");
      var enemyX = d3.select(this).attr("cx");
      var enemyY = d3.select(this).attr("cy");
      if (Math.sqrt(Math.pow(heroX - enemyX,2) + Math.pow(heroY - enemyY,2)) < 35){
        console.log("OW");
      }
    });
  };

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
      .duration(1000)
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
      .attr("class", "hero")
      .call(drag);
  };

  makeHero();
  setInterval(collide, 50)
// encapsulate player create into a function
  // give player some kind of 'on() do()' function

// collision detection

// keep track of user score

})();
