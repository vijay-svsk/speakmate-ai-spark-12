
import { useState, useRef, useCallback } from 'react';

interface SpeechRecognitionHook {
  transcript: string;
  isListening: boolean;
  supported: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

export const useSpeechRecognition = (): SpeechRecognitionHook => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const supported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  const startListening = useCallback(() => {
    if (!supported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current.onresult = (event) => {
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

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
  }, [supported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    transcript,
    isListening,
    supported,
    startListening,
    stopListening,
    resetTranscript
  };
};
