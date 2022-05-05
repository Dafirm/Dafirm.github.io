window.onload = function(){
  //get the canvasand context and store in vars

  var canvas = document.getElementById("sky");
  var ctx = canvas.getContext("2d");

  //set canvas dime to window height and width
  var W = window.innerWidth
  var H = window.innerHeight;
  //set dimension for canvas
  canvas.width = W;
  canvas.height = H;

  //generate the snow flakes and apply attribute
  var mf = 100; // max flakes
  var flakes = [];

  //loop thru the empty flakes and apply attributes

  for(var i = 0; i < mf; i++){
    flakes.push({
      x: Math.random()*W,//random number btw 0 and 1 in width
      y: Math.random()*H,
      r: Math.random()*5 + 2, //min of 2px and max of 74px
      d: Math.random() + 1 //density of flakes

    })
  }
  // draw flakes onto canvas
  function drawFlakes(){
    ctx.clearRect(0, 0, W, H );
    ctx.fillStyle = "white"; //shape of fills will be white
    ctx.beginPath(); //about to drw shape
    for(var i = 0; i < mf; i++){
      var f = flakes[i];
      ctx.moveTo(f.x, f.y);//move the draw position point to this cordinate
      ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
    }
    ctx.fill();
    moveFlakes();
  }

  //animate the drawFlakes
  var angle = 0;
  function moveFlakes(){
    angle += 0.01;
    for(var i = 0; i < mf; i++){
      //store current flake
      var f = flakes[i];

      //update X and Y coordinates of each snowFlake
      f.y += Math.pow(f.d, 2) + 1;
      f.x += Math.sin(angle) * 2;

      //if the snow Flake reaches the bottom, send a new one to the top
      if(f.y > H){
        flakes[i] = {x: Math.random()* W, y: 0, r: f.r, d: f.d}
      }
    }
  }
  setInterval(drawFlakes, 25);
}
