import React, { Component } from 'react';
import Spectrogram from 'spectrogram';

const url = '/static/media/sample.mp3';

class SpectrogramComponent extends Component {
  constructor(props) {
    super(props);
  }

  spectroCallback(songBuffer, source) {
    const { audioContext, callBacks } = this.props;
    this.spectro.connectSource(songBuffer, audioContext);
    source.connect(audioContext.destination);
    source.loop = true;
   //this.spectro.start();
    callBacks(this.spectro, source);
  }

  fetch(onLoad) {
    this.request = new XMLHttpRequest();
    this.request.open('GET', url, true);
    this.request.responseType = 'arraybuffer';
    this.request.onload = onLoad || function () {};
    this.request.send();
  }

  onAudioLoad() {
    const { audioContext } = this.props;
    let source = audioContext.createBufferSource();

    audioContext.decodeAudioData(this.request.response)
      .then((buffer) => {
        source.buffer = buffer;
        this.spectro = Spectrogram(
          document.getElementById('spectro'), {
          canvas: {
            height: 200,
            width: 600
          }
        });
        window.spectro = this.spectro;
        audioBufferSlice(audioContext, buffer, 0, buffer.length, (error, buf) => {
          this.spectroCallback(buffer, source);
        });
      }).catch((e) => {
        console.warn(e);
    });
  }

  componentDidMount() {
    this.fetch(this.onAudioLoad.bind(this));
  }

  render() {
    const { title } = this.props;
    
    return (
      <div>
        <h4>{title}</h4>
        <canvas //ref={(node) => (this.canvas = node)}
          id='spectro' >
        </canvas>
      </div>
    );
  }
}

export default SpectrogramComponent;

