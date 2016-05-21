import React, {Component} from 'react';
import Waveform from 'audio-waveform';

const url = 'media/female.wav';

class Wave extends Component {
  static displayName = 'Wave';

  constructor(props) {
    super(props);

    this.plotter = new Waveform({
      channel: 0, size: 1024, offset: undefined, framesPerSecond: 20, line: true, bufferSize: 44100, canvas: this.refs.wave
    });
  }

  renderWave() {
    const { audioContext } = this.props;
    this.source = audioContext.createBufferSource();
    console.log('Wave', this.request.response);

    audioContext.decodeAudioData(this.request.response)
      .then(buffer => {
        this.source.buffer = buffer;
        this.source.connect(audioContext.destination);
        this.source.buffer.pipe(this.plotter);
      })
      .catch((e) => {
        console.warn('No audio data (wave)!', e);
      });
  }

  fetch(onLoad) {
    this.request = new XMLHttpRequest();
    this.request.open('GET', url, true);
    this.request.responseType = 'arraybuffer';
    this.request.onload = onLoad;
    console.log('sending from wave');
    this.request.send();
  }

  componentWillMount() {
    this.fetch(this.renderWave.bind(this));
  }

  render() {
    return <canvas ref='wave'/>
  }
}
export default Wave;


