
// set up basic variables for app

const record = document.querySelector('.record');
const stop = document.querySelector('.stop');
const playButton = document.querySelector('.play');
const soundClips = document.querySelector('.sound-clips');
const canvas = document.getElementById('oscilloscope');
const spectrumCanvas = document.getElementById('spectrum');
const mainSection = document.querySelector('.main-controls');
//var audio = new chunks();
//audio.controls = true;
//audio.autoplay = true;
//audio.loop = true;

// disable stop button while not recording

stop.disabled = true;
playButton.disabled = true;

// visualiser setup - create web audio api context and canvas

const audioCtx = new window.AudioContext;
const canvasCtx = canvas.getContext("2d");
const spectrumCtx = spectrumCanvas.getContext("2d");
const sampleRate = audioCtx.sampleRate;

let chunks = [];

//main block for doing the audio recording

if (navigator.mediaDevices.getUserMedia) {
  console.log('getUserMedia supported.');

  const constraints = { audio: true };

  let onSuccess = function(stream) {
    const mediaRecorder = new MediaRecorder(stream);

    visualize(stream, canvasCtx);

    record.onclick = function() {
        chunks = [];
        mediaRecorder.start();
        console.log(mediaRecorder.state);
        console.log("recorder started");
        record.style.background = "red";

        stop.disabled = false;
        record.disabled = true;
        playButton.disabled = true;
    }

    stop.onclick = function() {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log("recorder stopped");
      record.style.background = "";
      record.style.color = "";
      // mediaRecorder.requestData();

      stop.disabled = true;
      playButton.disabled = false;
      record.disabled = false;
    }

    playButton.onclick = function() {
        let channels = 2;
      if(!audioCtx) {
            init();
            const play = () => {
                audio.play();
              }

      }

        // Create an empty two second stereo buffer at the
        // sample rate of the AudioContext
        let frameCount = chunks.length;

        let myArrayBuffer = audioCtx.createBuffer(channels, frameCount, sampleRate);

        // Fill the buffer with white noise;
        //just random values between -1.0 and 1.0
        for (let channel = 0; channel < channels; channel++) {
        // This gives us the actual array that contains the data
            let nowBuffering = myArrayBuffer.getChannelData(channel);
            for (let i = 0; i < frameCount; i++) {
                // Math.random() is in [0; 1.0]
                // audio needs to be in [-1.0; 1.0]
                nowBuffering[i] = chunks[i++];
            }
        }

        // Get an AudioBufferSourceNode.
        // This is the AudioNode to use when we want to play an AudioBuffer
        let source = audioCtx.createBufferSource();
        // set the buffer in the AudioBufferSourceNode

        source.buffer = myArrayBuffer;

        visualizeSpectrum(source, spectrumCtx);

        // connect the AudioBufferSourceNode to the
        // destination so we can hear the sound
        //source.connect(audioCtx.destination);
    }

    mediaRecorder.onstop = function(e) {
      console.log("data available after MediaRecorder.stop() called.");

    //   const clipName = prompt('Enter a name for your sound clip?','My unnamed clip');

      const clipContainer = document.createElement('article');
      const clipLabel = document.createElement('p');
      const deleteButton = document.createElement('button');
    //   const audio = document.createElement('audio');

      clipContainer.classList.add('clip');
    //   audio.setAttribute('controls', '');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete';

    //   if(clipName === null) {
    //     clipLabel.textContent = 'My unnamed clip';
    //   } else {
    //     clipLabel.textContent = clipName;
    //   }

    //   clipContainer.appendChild(audio);
    //   clipContainer.appendChild(clipLabel);
      clipContainer.appendChild(deleteButton);
      soundClips.appendChild(clipContainer);

    //   audio.controls = true;
    //   const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
    //   chunks = [];
    //   const audioURL = window.URL.createObjectURL(blob);
    //   audio.src = audioURL;
      console.log("recorder stopped");
      console.log(chunks.length + "\n");
      console.log(chunks);

      deleteButton.onclick = function(e) {
        let evtTgt = e.target;
        evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
      }

      clipLabel.onclick = function() {
        const existingName = clipLabel.textContent;
        const newClipName = prompt('Enter a new name for your sound clip?');
        if(newClipName === null) {
          clipLabel.textContent = existingName;
        } else {
          clipLabel.textContent = newClipName;
        }
      }
    }

    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    }
  }

  let onError = function(err) {
    console.log('The following error occured: ' + err);
  }

  navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);



} else {
   console.log('getUserMedia not supported on your browser!');
}

// function visualize(stream) {

//   const source = audioCtx.createMediaStreamSource(stream);

//   const analyser = audioCtx.createAnalyser();
//   analyser.fftSize = 2048;
//   const bufferLength = analyser.frequencyBinCount;
//   const dataArray = new Uint8Array(bufferLength);

//   source.connect(analyser);
//   //analyser.connect(audioCtx.destination);

//   draw()

//   function draw() {
//     const WIDTH = canvas.width
//     const HEIGHT = canvas.height;

//     requestAnimationFrame(draw);

//     analyser.getByteTimeDomainData(dataArray);

//     canvasCtx.fillStyle = 'rgb(200, 200, 200)';
//     canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

//     canvasCtx.lineWidth = 2;
//     canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

//     canvasCtx.beginPath();

//     let sliceWidth = WIDTH * 1.0 / bufferLength;
//     let x = 0;


//     for(let i = 0; i < bufferLength; i++) {

//       let v = dataArray[i] / 128.0;
//       let y = v * HEIGHT/2;

//       if(i === 0) {
//         canvasCtx.moveTo(x, y);
//       } else {
//         canvasCtx.lineTo(x, y);
//       }

//       x += sliceWidth;
//     }

//     canvasCtx.lineTo(canvas.width, canvas.height/2);
//     canvasCtx.stroke();

//   }
// }

window.onresize = function() {
  canvas.width = mainSection.offsetWidth;
}

window.onresize();

function visualize(stream, canvasCtx) {

    const source = audioCtx.createMediaStreamSource(stream);

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);
    //analyser.connect(audioCtx.destination);

    draw()

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

    }
}

// const pre = document.querySelector('pre');
// const myScript = document.querySelector('script');

// pre.innerHTML = myScript.innerHTML;

// Stereo

function init() {
    audioCtx = new AudioContext();
}

function visualizeSpectrum(source, canvasCtx) {

    //const source = audioCtx.createMediaStreamSource(stream);

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    source.start();

    source.onended = () => {
        console.log('Playback finished');
    }

    draw()

    function draw() {
      const WIDTH = canvas.width
      const HEIGHT = canvas.height;

      requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

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

      canvasCtx.lineTo(canvas.width, 0);
      canvasCtx.stroke();

    }
}
