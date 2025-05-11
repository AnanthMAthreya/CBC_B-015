// src/api.js

const API_URL = 'http://localhost:5000/process'; // Change this if hosted elsewhere

// Function to send text or audio query to Flask backend
export const sendQuery = async (queryTextOrAudio, category, languageCode = 'hi') => {
  const formData = new FormData();
  formData.append('category', category);
  formData.append('language_code', languageCode);

  if (queryTextOrAudio instanceof Blob) {
    // If it's an audio Blob
    formData.append('audio', queryTextOrAudio, 'query.wav');
  } else {
    // If it's text
    const textBlob = new Blob([queryTextOrAudio], { type: 'text/plain' });
    formData.append('text', textBlob, 'query.txt');
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch response from backend');
  }

  // Create an audio URL to play in browser
  const audioBlob = await response.blob();
  return URL.createObjectURL(audioBlob);
};

// Function to record user's voice using MediaRecorder
export const recordAudio = () => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        const chunks = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/wav' });
          resolve(audioBlob);
        };

        mediaRecorder.onerror = reject;

        // Record for 5 seconds then stop
        mediaRecorder.start();
        setTimeout(() => {
          mediaRecorder.stop();
        }, 5000);
      })
      .catch(reject);
  });
};
