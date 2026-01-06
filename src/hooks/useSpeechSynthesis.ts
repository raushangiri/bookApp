"use client";

import { useState, useEffect, useCallback } from "react";

export const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const updateVoices = useCallback(() => {
    const availableVoices = window.speechSynthesis.getVoices();
    setVoices(availableVoices);
    if (availableVoices.length > 0) {
      // Prefer the currently selected voice if it's still available
      const currentVoiceStillAvailable = availableVoices.some(v => v.name === selectedVoice?.name);
      if (!currentVoiceStillAvailable) {
        // Otherwise, set a new default
        setSelectedVoice(availableVoices.find(v => v.default) || availableVoices[0]);
      }
    }
  }, [selectedVoice]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
        updateVoices();
        window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
          window.speechSynthesis.onvoiceschanged = null;
          window.speechSynthesis.cancel();
      }
    };
  }, [updateVoices]);

  const speak = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis || !text) {
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const newUtterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      newUtterance.voice = selectedVoice;
    }
    newUtterance.rate = rate;

    newUtterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    newUtterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setUtterance(null);
    };
    
    newUtterance.onerror = (event) => {
        console.error('SpeechSynthesisUtterance.onerror', event);
        setIsPlaying(false);
        setIsPaused(false);
        setUtterance(null);
    }

    setUtterance(newUtterance);
    window.speechSynthesis.speak(newUtterance);
  };

  const pause = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const cancel = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };

  return {
    voices,
    selectedVoice,
    setSelectedVoice,
    isPlaying,
    isPaused,
    rate,
    setRate,
    speak,
    pause,
    resume,
    cancel,
    isSupported: typeof window !== 'undefined' && 'speechSynthesis' in window,
  };
};
