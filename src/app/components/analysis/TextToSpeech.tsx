// src/app/components/analysis/TextToSpeech.tsx

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiVolume2, FiVolumeX } from 'react-icons/fi'

export const TextToSpeech = (props: any) => {
  const { text, className = "", lang = 'th-TH' } = props
  const [isPlaying, setIsPlaying] = useState(false)

  const handleSpeak = () => {
    if (!text) return

    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      return
    }

    const speech = new SpeechSynthesisUtterance(text)
    speech.lang = lang
    speech.rate = 1.0
    speech.pitch = 1.0
    speech.volume = 1.0
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