import React, { Component } from 'react';
import Spectrogram from 'spectrogram';
const url = '../media/ethos_final_hope.mp3';

class SpectrogramComponent extends Component {
  constructor(props) {
    super(props);
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
    this.props.audioContext.decodeAudioData(this.request.response)
      .then((buffer) => {
        this.spectro.addSource(buffer, this.props.audioContext);
        this.spectro.start();
      }).catch((e) => {
        console.warn('No audio data (spectro)!', e);
    });
  }

  componentWillMount() {
    this.fetch(this.onAudioLoad.bind(this));
  }

  componentDidMount() {
    if (this.canvas) {
      this.spectro = Spectrogram(this.canvas, {
        canvas: {
          height: 400,
          width: 1000
        },
        audio: {
          enable: true
        }
      });

      window.spectro = this.spectro;
    }
  }

  render() {
    const { title } = this.props;
    
    return (
      <div>
        <h4>{title}</h4>
        <canvas ref={(node) => (this.canvas = node)}>
        </canvas>
      </div>
    );
  }
}

export default SpectrogramComponent;

