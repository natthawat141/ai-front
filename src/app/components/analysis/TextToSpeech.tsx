'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiVolume2, FiVolumeX } from 'react-icons/fi'

interface TextToSpeechProps {
  text: string
  className?: string
  lang?: 'th-TH' | 'en-US'
}

export const TextToSpeech: React.FC<TextToSpeechProps> = ({
  text,
  className = "",
  lang = 'th-TH'
}) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const handleSpeak = () => {
    if (!text) return

    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      return
    }

    // Create speech synthesis
    const speech = new SpeechSynthesisUtterance(text)
    speech.lang = lang
    speech.rate = 1.0
    speech.pitch = 1.0
    speech.volume = 1.0

    // Get voices
    const voices = window.speechSynthesis.getVoices()
    const selectedVoice = voices.find(voice => 
      lang === 'th-TH' 
        ? (voice.lang === 'th-TH' || voice.lang.startsWith('th'))
        : (voice.lang === 'en-US' || voice.lang.startsWith('en'))
    )

    if (selectedVoice) {
      speech.voice = selectedVoice
    }

    speech.onend = () => setIsPlaying(false)
    
    window.speechSynthesis.speak(speech)
    setIsPlaying(true)
  }

  return (
    <motion.button
      onClick={handleSpeak}
      className={`p-2 hover:bg-white/10 rounded-lg transition-colors ${className}`}
      title={isPlaying ? 'หยุดอ่าน' : 'อ่านข้อความ'}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isPlaying ? (
        <FiVolumeX className="w-5 h-5 text-cyan-400" />
      ) : (
        <FiVolume2 className="w-5 h-5 text-cyan-400" />
      )}
    </motion.button>
  )
}