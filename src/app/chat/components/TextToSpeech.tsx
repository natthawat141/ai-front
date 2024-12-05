'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiVolume2 } from 'react-icons/fi'
import { FaRegFilePdf } from 'react-icons/fa'

interface TextToSpeechProps {
  text: string
  onComplete?: () => void
  lang?: string 
  voice?: string // เพิ่มตัวเลือกเสียง
  rate?: number  // ความเร็วในการพูด
  pitch?: number // ระดับเสียงสูง-ต่ำ
  volume?: number // ระดับความดัง
  autoPlay?: boolean
  className?: string
  showControls?: boolean // แสดง/ซ่อนปุ่มควบคุม
}
const TextToSpeech: React.FC<TextToSpeechProps> = ({
  text,
  onComplete,
  lang = 'th-TH',
  voice = '',
  rate = 1,
  pitch = 1,
  volume = 1,
  autoPlay = false,
  className = '',
  showControls = true
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(null)
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)

  // โหลดรายการเสียงที่มี
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices()
      setVoices(availableVoices)
      
      // เลือกเสียงภาษาไทยเป็นค่าเริ่มต้น
      const thVoice = availableVoices.find(v => v.lang === 'th-TH')
      if (thVoice) setCurrentVoice(thVoice)
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
  }, [])

  const handleSpeak = () => {
    if (!text || typeof window === 'undefined') return

    // หยุดเสียงที่กำลังเล่น
    window.speechSynthesis.cancel()

    if (isPlaying) {
      setIsPlaying(false)
      return
    }

    const speech = new SpeechSynthesisUtterance(text)
    
    // ตั้งค่าคุณสมบัติเสียง
    speech.lang = lang
    speech.rate = rate 
    speech.pitch = pitch
    speech.volume = volume
    if (currentVoice) speech.voice = currentVoice

    // Event handlers
    speech.onstart = () => setIsPlaying(true)
    speech.onend = () => {
      setIsPlaying(false)
      onComplete?.()
    }
    speech.onerror = (event) => {
      console.error('Speech error:', event)
      setIsPlaying(false)
      onComplete?.()
    }

    speechRef.current = speech
    window.speechSynthesis.speak(speech)
  }

  // หยุดเสียงเมื่อ component unmount
  useEffect(() => {
    return () => {
      if (speechRef.current) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // เริ่มเล่นอัตโนมัติถ้าตั้งค่าไว้
  useEffect(() => {
    if (autoPlay && text && !isPlaying) {
      handleSpeak()
    }
  }, [text, autoPlay])

  return (
    <div className={className}>
      {showControls && (
        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeak}
            className="p-2 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 
                     transition-colors disabled:opacity-50"
            disabled={!text}
          >
            {isPlaying ? (
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-75" />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-150" />
              </div>
            ) : (
              <FiVolume2 className="w-5 h-5 text-cyan-400" />
            )}
          </button>

          {voices.length > 0 && (
            <select
              value={currentVoice?.name || ''}
              onChange={(e) => {
                const selected = voices.find(v => v.name === e.target.value)
                if (selected) setCurrentVoice(selected)
              }}
              className="bg-white/10 text-white border border-cyan-500/20 
                       rounded-lg px-2 py-1 text-sm"
            >
              {voices.map(voice => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </div>
  )
}