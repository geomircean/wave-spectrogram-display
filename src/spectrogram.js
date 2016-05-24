import React, { Component } from 'react';
import Spectrogram from 'spectrogram';
import audioBufferSlice from './audio-buffer-slice';

const url = '/static/media/female.wav';

class SpectrogramComponent extends Component {
  constructor(props) {
    super(props);
  }

  spectroCallback(songBuffer) {
    const { audioContext } = this.props;
    this.spectro.connectSource(songBuffer, audioContext);
    this.spectro.start();
    // if (songBuffer.length) {
    //   this.spectro.pause();
    // }
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
        this.spectro = Spectrogram(
          document.getElementById('spectro'), {
          canvas: {
            height: 200,
            width: 300
          },
          audio: {
            enable: true
          }
        });
        //window.spectro = this.spectro;
        audioBufferSlice(audioContext, buffer, 0, buffer.length, (error, buf) => {
          this.spectroCallback(buf);
        });
      }).catch((e) => {
        console.warn(e);
    });
  }

  componentDidMount() {
    this.fetch(this.onAudioLoad.bind(this));
  }

  // componentDidMount() {
  //   if (this.canvas) {
  //     this.spectro = Spectrogram(document.getElementById('spectro'), {
  //       canvas: {
  //         height: 400,
  //         width: 1000
  //       },
  //       audio: {
  //         enable: true
  //       }
  //     });
  //     window.spectro = this.spectro;
  //   }
  // }

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

