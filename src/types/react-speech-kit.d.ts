// src/types/react-speech-kit.d.ts
declare module 'react-speech-kit' {
    export interface UseSpeechSynthesisOptions {
      onEnd?: () => void;
      onStart?: () => void;
      onError?: (error: Error) => void;
      onPause?: () => void;
      onResume?: () => void;
    }
  
    export interface SpeechSynthesisHook {
      speak: (text: string) => void;
      cancel: () => void;
      speaking: boolean;
      supported: boolean;
      voices: SpeechSynthesisVoice[];
    }
  
    export function useSpeechSynthesis(options?: UseSpeechSynthesisOptions): SpeechSynthesisHook;
  }