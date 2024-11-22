'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiVolume2, FiVolumeX } from 'react-icons/fi'
const { useSpeechSynthesis } = require('react-speech-kit') as any;


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
  const { speak, cancel, speaking, voices } = useSpeechSynthesis()

  const handleSpeak = () => {
    if (!text) return

    if (isPlaying) {
      cancel()
      setIsPlaying(false)
      return
    }

    // หาเสียงภาษาไทย
    const thaiVoice = voices.find(voice => 
      voice.lang === 'th-TH' || 
      voice.lang.startsWith('th')
    )

    speak({ 
      text,
      voice: thaiVoice,
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
      lang,
      onEnd: () => setIsPlaying(false)
    })

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