const AudioContext = window.AudioContext || window.webkitAudioContext;
const URL = window.URL || window.webkitURL;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

import React from 'react';
import { render } from 'react-dom';
import ContentWrapper from './content-wrapper';

const App = () => {
  const audioContext  = new AudioContext();
  return (
    <div>
      <ContentWrapper
        audioContext={audioContext}
      />
    </div>
  )
};

render(<App />, document.getElementById('root'));
