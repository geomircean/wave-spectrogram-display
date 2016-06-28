import React, {Component} from 'react';
import Spectrogram from './spectrogram';
import Wave from './wave2';

const url = '/static/media/sample.mp3';

class ContentWrapper extends Component {
  static displayName = 'ContentWrapper';

  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      end: 0,
      currentTime: 0,
      textAreaValue: '',
      pauseFlag: 0,
      bufferSource: 0,
      spectro: 0
    }
  }

  callBacksSpectro(spectro, bufferSource) {
    this.setState({
      spectro: spectro, bufferSource: bufferSource
    });
  }

  onPlay() {
    if (this.state.pauseFlag) {
      this.state.spectro.resume();
    } else {
      this.state.spectro.start();
    }

    this.state.bufferSource.start(this.state.currentTime);
  }

  onStop() {
    const { spectro, bufferSource} = this.state;

    spectro.pause();
    bufferSource.stop();
    console.log(spectro);

    this.setState({
      pauseFlag: 1,
      currentTime: spectro._pausedAt
    });
  }

  addTimeToTextArea() {
    const { value } = this.refs.timeTags;
    const time = this.state.spectro._pausedAt;
    const modulo = time % 1000;
    const timeS = time / 1000 - modulo / 1000;
    const timeTag = '[00 : 00 : ' + timeS + ' : ' + modulo + ']';
    this.setState({
      textAreaValue: value + '\n' + timeTag
    });

  }

  handleChange(event) {
    const { value } = event.currentTarget;
    this.setState({
      textAreaValue: value
    });
  }

  resetState() {
    this.setState({
      currentTime: 0, pauseFlag: 0
    });
  }

  render() {
    const { audioContext } = this.props;

    return (
      <div>
        <span>
          <Wave audioContext={audioContext} url={url}/>
          <Spectrogram title='This is a spectrogram canvas'
                       audioContext={audioContext}
                       url={url}
                       onEnded={this.resetState}
                       callBacks={this.callBacksSpectro.bind(this)}
          />
        </span>
        <span stu>
          <h4>Control buttons</h4>
          <button onClick={this.onPlay.bind(this)}>{this.state.pauseFlag ? 'Resume' : 'Play'}</button>
          <button onClick={this.onStop.bind(this)}>Pause</button>
          <button onClick={this.addTimeToTextArea.bind(this)}>Add time tag</button>
          <div>
            <form>
              <h4> Audio tags </h4>
              <textarea
                ref='timeTags'
                type='text'
                style={{
                  height: '200px',
                  width: '600px'
                }}
                value={this.state.textAreaValue}
                onChange={this.handleChange.bind(this)}
              />
            </form>
          </div>
        </span>

      </div>
    );
  }
}

export default ContentWrapper;

