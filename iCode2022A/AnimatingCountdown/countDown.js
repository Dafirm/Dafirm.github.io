function updateTimer(deadline){
  var time = deadline - new Date();
  return {
    'days' : Math.floor( time/(1000*60*60*24)),
    'hours': Math.floor( (time/(1000*60*60)) % 24),
    'minutes': Math.floor( (time/1000/60) % 60),
    'seconds' : Math.floor( (time/1000) % 60 ),
    'total' : time
  };
}


function startTimer(id, deadline){
  var timerInterval = setInterval(function(){
    var clock = document.getElementById(id);
    var timer = updateTimer(deadline);

    clock.innerHTML = '<span>' + timer.days + '</span>'
                    + '<span>' + timer.hours + '</span>'
                    + '<span>' + timer.minutes + '</span>'
                    + '<span>' + timer.seconds + '</span>';

    //animations
    var spans = clock.getElementsByTagName("span");
    animateClock(spans[3]);
    if(timer.seconds == 59) animateClock(spans[2]);
    if(timer .minutes == 59 && timer.second == 59)animateCLock(span[1]);
    if(timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) animateClock(spans[0]);

    //check for the end of timer
    if(timer.total < 1){
      clearInterval(timerInterval);
      clock.innerHTML = '<span>0</span><span>0</span><span>0</span><span>0</span>';
    }

  }, 1000);
}

window.onload = function(){
  var deadline = new Date("Dec 12, 2022 12:30:00");
  startTimer("clock", deadline);
};
