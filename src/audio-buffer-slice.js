function audioBufferSlice(audioContext, buffer, begin, end, callback) {
  // const { audioContext, buffer } = props;
  // let { begin, end, callback } = props;
  if (!(this instanceof audioBufferSlice)) {
    return new audioBufferSlice(audioContext, buffer, begin, end, callback);
  }

  var error = null;
  var duration = buffer.duration;
  var channels = buffer.numberOfChannels;
  var rate = buffer.sampleRate;

  if (typeof end === 'function') {
    callback = end;
    end = duration;
  }

  // milliseconds to seconds
  begin = begin/1000;
  end = end/1000;

  if (begin < 0) {
    error = new RangeError('begin time must be greater than 0');
  }

  if (end > duration) {
    error = new RangeError('end time must be less than or equal to ' + duration);
  }

  if (typeof callback !== 'function') {
    error = new TypeError('callback must be a function');
  }

  var startOffset = rate * begin;
  var endOffset = rate * end;
  var frameCount = endOffset - startOffset;
  var newArrayBuffer;

  try {
    newArrayBuffer = audioContext.createBuffer(channels, endOffset, rate);
    var anotherArray = new Float32Array(frameCount);
    var offset = 0;

    for (var channel = 0; channel < channels; channel++) {
      buffer.copyFromChannel(anotherArray, channel, startOffset);
      newArrayBuffer.copyToChannel(anotherArray, channel, offset);
    }
  } catch(e) {
    error = e;
  }

  callback(error, newArrayBuffer);
}

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = audioBufferSlice;
  }
  exports.audioBufferSlice = audioBufferSlice;
} else if (typeof define === 'function' && define.amd) {
  define([], function() {
    return audioBufferSlice;
  });
};