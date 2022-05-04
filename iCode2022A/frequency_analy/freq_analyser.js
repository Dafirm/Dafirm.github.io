// create a new instance of an audio object and adjust some of its properties
var audio = new Audio();
audio.src = 'track1.mp3';
audio.controls = true;
audio.loop = true;
audio.autoplay = true;
var height = 10;
var width = 5;

/*const canvas = document.querySelector('.analyser_render');
const ctx = document.querySelector('.ctx');
const source = document.querySelector('.source');
const analyser = document.querySelector('.analyser');
const fbc_array = document.querySelector('.fbc_array');
const bars = document.querySelector('.bars');
const bar_x = document.querySelector('.bar_x');
const bar_width = document.querySelector('.bar_width');
const bar_height = document.querySelector('.bar_height');*/
//Establish all variables that the analyser will getUserMedia
var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
//initialize the MP3 player after the page loads all its HTML into the window
window.addEventListener("load", initMp3Player, false);
function initMp3Player(){
  document.getElementById('audio_box').appendChild(chk);
  context = new webkitAudioContext();//AudioContext object instance
  analyser = context.createAnalyser(); //AnalyserNode method
  canvas = document.getElementById('analyser_render');
  ctx = canvas.getContext('2d');
  // Re-route audio playback into the processing graph of the AudioContext
  source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);
  frameLooper();

}
/*draw()

function draw() {
  const WIDTH = canvas.width
  const HEIGHT = canvas.height;
  requestAnimationFrame(draw);
  analyser.getByteTimeDomainData(dataArray);
  canvasCtx.fillStyle = 'rgb(200, 200, 200)';
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

  canvasCtx.beginPath();

  let sliceWidth = WIDTH * 1.0 / bufferLength;
  let x = 0;


  for(let i = 0; i < bufferLength; i++) {

    let v = dataArray[i] / 128.0;
    let y = v * HEIGHT/2;

    if(i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }
  canvasCtx.lineTo(canvas.width, canvas.height/2);
  canvasCtx.stroke();
}*/
//frameLooper() animates any style of graphics you wish to the audio frequencyBinCount
//Looping at the default frame rate that the browser provides(approx. 60 FPS)

function frameLooper(){
  const WIDTH = canvas.width
  const HEIGHT = canvas.height;
  canvasCtx.fillStyle = 'rgb(200, 200, 200)';
  window.webkitRequestAnimationFrame(frameLooper);
  fbc_array = new Unit8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(fbc_array);
  canvasctx.clearRect(0, 0, canvas.width, canvas.height);//clear the canvas
  canvasctx.fillStyle = '#00CCFF'; //color of the bars
  bars = 100;
  for ( var i= 0; i < bars; i++) {
    bar_x = i * 3;
    bar_width = 2;
    bar_height = -(fbc_array[i] / 2);
    //fillRect(x,y,width, height) // Explanation of thje parameters below
    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
  }
}
