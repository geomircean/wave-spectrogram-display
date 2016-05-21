const AudioContext = window.AudioContext || window.webkitAudioContext;
const URL = window.URL || window.webkitURL;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

import React, {Component} from 'react';
import {render} from 'react-dom';
import Spectrogram from './spectrogram';
import Wave from './wave';

const App = () => {
  const audioContext  = new AudioContext();
  return (
    <div>
      <h4>Some Title</h4>
      <Wave audioContext={audioContext}/>
      <Spectrogram title='This is a spectrogram canvas'
                   audioContext={audioContext}/>
    </div>
  )
};

render(<App />, document.getElementById('root'));
