import React, { useState, useRef } from 'react';
import { startRecording, pauseRecording, resumeRecording, stopRecording, transcribeAudio } from './api';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');
  const mediaRecorderRef = useRef(null);

  // Start recording
  const handleStartRecording = async () => {
    await startRecording(mediaRecorderRef);
    setIsRecording(true);
    setIsPaused(false);
  };

  // Pause recording
  const handlePauseRecording = () => {
    pauseRecording(mediaRecorderRef);
    setIsPaused(true);
  };

  // Resume recording
  const handleResumeRecording = () => {
    resumeRecording(mediaRecorderRef);
    setIsPaused(false);
  };

  // Stop recording and transcribe
  const handleStopRecording = async () => {
    const blob = await stopRecording(mediaRecorderRef);
    setIsRecording(false);
    setIsPaused(false);
    setAudioBlob(blob);

    // Transcribe the audio to text
    const text = await transcribeAudio(blob);
    setTranscribedText(text);

    // Create an audio URL from the blob
    const url = URL.createObjectURL(blob);
    setAudioUrl(url); // Set the URL for manual playback
  };

  // Play the recorded audio manually
  const handlePlayAudio = () => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div>
      <h3>Audio Recorder</h3>

      {/* Start/Stop Buttons */}
      {!isRecording ? (
        <button onClick={handleStartRecording}>Start Recording</button>
      ) : (
        <>
          <button onClick={handlePauseRecording} disabled={isPaused}>
            Pause Recording
          </button>
          <button onClick={handleResumeRecording} disabled={!isPaused}>
            Resume Recording
          </button>
        </>
      )}

      {isRecording && (
        <button onClick={handleStopRecording}>Stop Recording</button>
      )}

      {/* Display Transcribed Text */}
      {transcribedText && (
        <div>
          <h4>Transcribed Text:</h4>
          <p>{transcribedText}</p>
        </div>
      )}

      {/* Play audio button */}
      {audioUrl && (
        <div>
          <button onClick={handlePlayAudio}>Play Audio</button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
