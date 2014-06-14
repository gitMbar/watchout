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
    //.attr("xmlns", "http://www.w3.org/2000/svg")
    //.attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    //.attr("version", "1.1")
    .on("click", click)


  var collide = function(){
    d3.selectAll(".enemy").attr("cx", function(d){
      var heroX = d3.select(".hero").attr("cx");
      var heroY = d3.select(".hero").attr("cy");
      var enemyX = d3.select(this).attr("x");
      var enemyY = d3.select(this).attr("y");
      if (Math.sqrt(Math.pow(heroX - enemyX,2) + Math.pow(heroY - enemyY,2)) < 35){
       var current = d3.select('.current').select('span');
       var high = d3.select('.high').select('span');
       if (high.text() < current.text()){
        high.text(current.text())
       }
       current.text("0")
       var collisions = d3.select('.collisions').select('span').text();
       collisions++;
       d3.select('.collisions').select('span').text(collisions);
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
    d3.selectAll("svg").selectAll("image").data(positions).enter().append("image")
      .attr("x", function(d){ return d.x;})
      .attr("y", function(d) { return d.y;})
      .attr("height", 20)
      .attr("width", 20)
      .attr("class", "enemy")
      .attr("xlink:href", "http://img4.wikia.nocookie.net/__cb20130622125147/thehungergamesrp/images/a/ac/Shuriken.png")
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
      .attr("x", function(d){ return d.x;})
      .attr("y", function(d) { return d.y;})
      .tween("score", function(t){
        return function(){
          collide(this);
        }
      })
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
  //setInterval(collide, 50);
// keep track of user score
  setInterval(function(){
    var score = parseInt(d3.select('.current').select('span').text());
    score ++;
    d3.select('.current').select('span').text(score);
  }, 50);
// d3.select('collisions').select('span').text()
})();
