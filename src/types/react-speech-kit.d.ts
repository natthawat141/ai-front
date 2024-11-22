// src/types/react-speech-kit.d.ts

declare module 'react-speech-kit' {
    export const useSpeechSynthesis: () => {
      speak: (options: { text: string }) => void;
      cancel: () => void;
      speaking: boolean;
      voices: Array<{
        name: string;
        lang: string;
      }>;
    };
  }
  