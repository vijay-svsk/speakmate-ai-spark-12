
import { useState, useCallback } from 'react';

interface SpeechAudioHook {
  isListening: boolean;
  transcript: string;
  handleStartRecording: () => void;
  handleStopRecording: () => void;
  speakText: (text: string) => void;
}

export const useSpeechAudio = (): SpeechAudioHook => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const handleStartRecording = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error('Speech recognition not supported');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      
      if (finalTranscript) {
        setTranscript(prev => prev + finalTranscript);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.start();
  }, []);

  const handleStopRecording = useCallback(() => {
    setIsListening(false);
  }, []);

  const speakText = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  return {
    isListening,
    transcript,
    handleStartRecording,
    handleStopRecording,
    speakText
  };
};
