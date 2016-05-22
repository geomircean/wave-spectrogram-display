import React, {Component} from 'react';
import Waveform from 'audio-waveform';
const url = '../media/ethos_final_hope.mp3';

class Wave extends Component {
  static displayName = 'Wave';

  constructor(props) {
    super(props);

    this.plotter = new Waveform({
      channel: 0,
      size: 1024,
      offset: undefined,
      framesPerSecond: 20,
      line: true,
      bufferSize: 44100,
      canvas: this.canvas
    });
    this.analyser = props.audioContext.createAnalyser();
  }

  renderWave(res) {
    const { audioContext } = this.props;
    this.source = audioContext.createBufferSource(res.byteLength);

    audioContext.decodeAudioData(res)
      .then((data) => {
        this.source.buffer = data;
        this.source.connect(audioContext.destination);
        this.source.start();
        // this.source.pipe(this.plotter);
      }).catch((e) => {
        console.warn('No audio data (wave)!', e);
      });
  }

  fetch(onLoad) {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          onLoad(request.response)
        } else {
          console.error(request.statusText);
        }
      }
    };
    request.send(null);
  }

  componentWillMount() {
    this.fetch(this.renderWave.bind(this));
  }

  render() {
    return <canvas ref={(node) => (this.canvas = node)}/>
  }
}
export default Wave;


