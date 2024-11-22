'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiVolume2, FiVolumeX, FiMaximize2, FiMinimize2 } from 'react-icons/fi'

interface TextToSpeechProps {
  text: string
  onComplete?: () => void
  autoPlay?: boolean
  className?: string
  lang?: string
  showAvatar?: boolean
}

export const TextToSpeech: React.FC<TextToSpeechProps> = ({
  text,
  onComplete,
  autoPlay = false,
  className = "",
  lang = 'th-TH',
  showAvatar = true
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isExpanded, setIsExpanded] = useState(false)
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (autoPlay) {
      handleSpeak()
    }
    
    return () => {
      if (speechRef.current) {
        window.speechSynthesis.cancel()
      }
    }
  }, [autoPlay, text])

  const handleSpeak = () => {
    if (!text || typeof window === 'undefined') return
    
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

    speech.onstart = () => {
      setIsPlaying(true)
    }
    
    speech.onend = () => {
      setIsPlaying(false)
      onComplete?.()
    }

    speech.onerror = () => {
      setIsPlaying(false)
      onComplete?.()
    }

    speechRef.current = speech
    window.speechSynthesis.speak(speech)
    setIsPlaying(true)
  }

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev)
  }

  const cardVariants = {
    minimized: {
      width: "16rem", // w-64
      height: "auto",
      position: "fixed" as const,
      bottom: "1rem",
      right: "1rem",
    },
    expanded: {
      width: "100%",
      height: "100vh",
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }
  }

  return (
    <div className="relative">
      {/* Control Button when not autoPlay */}
      {!autoPlay && (
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
      )}

      {/* Avatar Card */}
      <AnimatePresence>
        {(isPlaying && showAvatar) && (
          <motion.div
            initial={isExpanded ? cardVariants.expanded : cardVariants.minimized}
            animate={isExpanded ? cardVariants.expanded : cardVariants.minimized}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="z-50"
          >
            {/* Card Container */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-xl h-full">
              {/* Content Container */}
              <div className="relative p-4 h-full flex flex-col">
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 px-4 py-2 bg-gradient-to-b from-white/10 to-transparent">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-sm font-medium">AI Assistant</h3>
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse delay-75"/>
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse delay-150"/>
                      </div>
                      <button
                        onClick={toggleExpanded}
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        {isExpanded ? (
                          <FiMinimize2 className="w-5 h-5" />
                        ) : (
                          <FiMaximize2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Avatar Container */}
                <div className={`mt-12 flex-1 flex items-center justify-center ${isExpanded ? 'scale-150' : ''}`}>
                  <div className="relative w-64 aspect-video rounded-lg overflow-hidden">
                    <img 
                      src="/img/video-unscreen.gif"
                      alt="Speaking Animation"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Text Content */}
                {isExpanded && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 p-6 bg-black/20 rounded-xl"
                  >
                    <p className="text-white/90 text-lg leading-relaxed">{text}</p>
                  </motion.div>
                )}

                {/* Footer */}
                <div className="mt-3 flex items-center justify-between text-xs text-white/70">
                  <span>AI Voice Active</span>
                  <span className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1"/>
                    Speaking
                  </span>
                </div>
              </div>

              {/* Background Gradient Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 animate-gradient"/>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}