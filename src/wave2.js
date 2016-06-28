import React, {Component} from 'react';
import DrawWave from 'draw-wave';
const url = '/static/media/sample.mp3';

class Wave2 extends Component {
  static displayName = 'Wave2';

  constructor(props) {
    super(props);
  }

  renderWave() {
    const { audioContext } = this.props;
    audioContext.decodeAudioData(this.request.response)
      .then((buffer) => {
        this.canvas.width = 600;
        DrawWave.canvas(document.querySelector('#wave2'), buffer, '#00000');
      }).catch((e) => {
      console.warn(e);
    });
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
    return <canvas id='wave2' ref={(node) => (this.canvas = node)}/>
  }
}
export default Wave2;


