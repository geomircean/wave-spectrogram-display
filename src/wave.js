import React, {Component} from 'react';
import Waveform from 'audio-waveform';
import Generator from 'audio-generator';
import pcm from 'pcm-util';
const url = '/static/media/female.wav';

class Wave extends Component {
  static displayName = 'Wave';

  constructor(props) {
    super(props);
    this.analyser = props.audioContext.createAnalyser();
    pcm.defaults = {
      channels: 1,
      sampleRate: 44100,
      interleaved: true,
      float: true,
      signed: true,
      bitDepth: 16,
      byteOrder: 'LE',
      max: 32767,
      min: -32768,
      sampleSize: 4,
      samplesPerFrame: 1024,
      id: 'S_16_LE_2_44100_I'
    };

  }

  renderWave(res) {
    const { audioContext } = this.props;
    this.source = audioContext.createBufferSource();

    audioContext.decodeAudioData(res)
      .then((data) => {
        this.plotter = new Waveform({
          channel: 0,
          size: 1024,
          offset: undefined,
          framesPerSecond: 20,
          line: true,
          bufferSize: 44100,
          canvas: document.getElementById('wave')
        });
        console.log(data);
        this.generator = Generator(
          () => {
            this.analyser.fftSize = 2048;
            var bufferLength = this.analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            const stream = this.analyser.getByteTimeDomainData(dataArray);
            return stream;
          }, {
            duration: data.length,
            period: Infinity
          })
          .on('error', function (e) {
            console.warn(e);
          })
          .pipe(this.plotter);

      }).catch((e) => {
        console.warn('No audio data (wave)!', e);
      });
  }

  fetch(onLoad) {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      console.log(request.response);
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

  componentDidMount() {
    this.fetch(this.renderWave.bind(this));
  }

  render() {
    return <canvas id='wave' />;
  }
}
export default Wave;

//ref={(node) => (this.canvas = node)}/>
