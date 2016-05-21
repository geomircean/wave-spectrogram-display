import React, {Component} from 'react';

const AudioContext = window.AudioContext || window.webkitAudioContext;
//const URL = window.URL || window.webkitURL;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

class SoundWave extends Component {
  constructor(props) {
    super(props);

    this.audioContext = new AudioContext();
  }

  fetch(onLoad) {
    this.request = new XMLHttpRequest();

    this.request.open('GET', 'media/sample.mp3', true);
    this.request.responseType = 'arraybuffer';
    this.request.onload = onLoad || function () {
      };
    this.request.send();
  }

  draw() {

  }

  onAudioLoad() {
    navigator.webkitGetUserMedia({
      video: false, audio: true
    }, (stream) => {
      var input = this.audioContext.createMediaStreamSource(stream);
      var analyser = this.audioContext.createAnalyser();

      analyser.fftSize = 2048;
      var bufferLenght = analyser.frequencyBinCount;
      
      var dataArray = new Uint8Array(bufferLenght);

      input.connect(analyser);

      this.spectro.connectSource(analyser, this.audioContext);
      this.spectro.start();
    }, function (error) {

    });
  }


  componentWillMount() {
    this.fetch(this.onAudioLoad.bind(this));
  }

  render() {
    return (
      <div>
        <canvas ref={(node) => (this.canvas = node)}>
        </canvas>
      </div>
    );
  }

}

export default SoundWave;