import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechTest = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'On' : 'Off'}</p>
      <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>
        Start
      </button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default SpeechTest;