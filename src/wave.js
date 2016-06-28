import React, {Component} from 'react';
import WaveformData from 'waveform-data';
const url = '/static/media/sample.mp3';

class Wave extends Component {
  static displayName = 'Wave';

  constructor(props) {
    super(props);
  }

  renderWave() {
    var waveform = WaveformData.create(this.request.response);
    console.log(waveform.max.length);
    //var waveform = waveform.resample({ scale: waveform.adapter.scale * 0.1 });
    const canvas = document.getElementById('wave');
    var interpolateHeight = function interpolateHeightGenerator (total_height){
      var amplitude = 256;
      return function interpolateHeight (size){
        return total_height - ((size + 128) * total_height) / amplitude;
      };
    };
    var y = interpolateHeight(this.canvas.height);
    var ctx = canvas.getContext('2d');
    ctx.beginPath();

// from 0 to 100
    waveform.min.forEach((val, x) => {
      ctx.lineTo(x + 0.5, y(val) + 0.5);
    });

// then looping back from 100 to 0
    waveform.max.reverse().forEach((val, x) => {
      ctx.lineTo((waveform.offset_length - x) + 0.5, y(val) + 0.5);
    });

    ctx.closePath();
    ctx.fill();
    // ctx.stroke();

  }

  fetch(onLoad) {
    this.request = new XMLHttpRequest();
    this.request.open('GET', url, true);
    this.request.responseType = 'arraybuffer';
    this.request.onload = onLoad || function () {};
    this.request.send();
  }

  componentDidMount() {
    this.fetch(this.renderWave.bind(this));
  }

  render() {
    return <canvas id='wave' ref={(node) => (this.canvas = node)}/>
  }
}
export default Wave;


