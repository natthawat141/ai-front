'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUpload, FiAlertCircle, FiMaximize2, FiMinimize2 } from 'react-icons/fi'
import { ChatInput } from './components/ChatInput'
import AnalysisResult from './components/analysis/AnalysisResult'
import { TextToSpeech } from './components/analysis/TextToSpeech'
import type { AnalysisData } from './components/analysis/types' // เพิ่มการนำเข้า

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  analysis?: AnalysisData | null
  error?: boolean
  isProcessing?: boolean
  isSpeaking?: boolean
}

interface UploadedFile {
  name: string
  timestamp: Date
}

// Assistant Message Component
const AssistantMessage: React.FC<{
  message: Message
  onSpeakingComplete: () => void
}> = ({ message, onSpeakingComplete }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isAnimating, setIsAnimating] = useState(true)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <AnimatePresence mode="wait">
        {isExpanded ? (
          // Expanded Avatar View
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-xl">
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 px-6 py-4 bg-gradient-to-b from-black/50 to-transparent z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <h3 className="text-white font-medium">AI Assistant</h3>
                  </div>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <FiMinimize2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Avatar Container */}
              <div className="relative aspect-video">
                <img
                  src="/img/video-unscreen.gif"
                  alt="AI Avatar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative p-6"
              >
                {message.analysis ? (
                  <AnalysisResult data={message.analysis} />
                ) : (
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg leading-relaxed text-white/90">
                      {message.content}
                    </p>
                  </div>
                )}

                {/* Auto-playing TextToSpeech */}
                <TextToSpeech
                  text={message.analysis ? (message.analysis.ai_recommendations || '') : message.content}
                  autoPlay={isAnimating}
                  onComplete={() => {
                    setIsAnimating(false)
                    onSpeakingComplete()
                    setIsExpanded(false)
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          // Collapsed Chat Bubble View
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-[80%] p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
          >
            {message.analysis ? (
              <AnalysisResult data={message.analysis} />
            ) : (
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <p className="text-white/90">
                    {message.content}
                  </p>
                </div>
                <TextToSpeech
                  text={message.content}
                  className="mt-1"
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// User Message Component
const UserMessage: React.FC<{ message: Message }> = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex justify-end"
  >
    <div className="max-w-[80%] p-4 rounded-xl bg-gradient-to-r from-cyan-500/90 to-blue-600/90 text-white backdrop-blur-sm">
      <p className="text-sm md:text-base">
        {message.content}
      </p>
    </div>
  </motion.div>
)

// Loading Indicator Component
const LoadingIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex justify-start"
  >
    <div className="flex space-x-2 p-4 bg-white/5 rounded-xl backdrop-blur-sm">
      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100" />
      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200" />
    </div>
  </motion.div>
)

// Error Message Component
const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center gap-2 p-4 bg-red-500/10 text-red-400 rounded-xl"
  >
    <FiAlertCircle className="w-5 h-5" />
    <p>{message}</p>
  </motion.div>
)

export default function Page() {
  // State Management
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll effect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // File Validation
  const validateFile = (file: File): boolean => {
    if (!file.type.includes('pdf')) {
      setError('Please upload a PDF file')
      return false
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size should be less than 10MB')
      return false
    }
    return true
  }

  // File Upload Handler
  const handleFileUpload = async (file: File) => {
    if (!file || !validateFile(file)) return
    setError(null)
    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('https://xawfeg5xdu3cnj-7860.proxy.runpod.net/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const data = await response.json()
      if (!data.result) throw new Error('Invalid response format')

      // Update states with successful upload
      setUploadedFile({
        name: file.name,
        timestamp: new Date()
      })

      // Add messages for file upload and analysis
      setMessages(prev => [...prev,
        {
          id: crypto.randomUUID(),
          role: 'user',
          content: `Uploaded: ${file.name}`,
          timestamp: new Date()
        },
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'Analysis Result:',
          timestamp: new Date(),
          analysis: data.result,
          isSpeaking: true
        }
      ])
    } catch (error) {
      // Error handling
      console.error('Error:', error)
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      setError(errorMessage)
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, there was an error analyzing the file. Please try again.',
        timestamp: new Date(),
        error: true
      }])
    } finally {
      setUploading(false)
    }
  }

  // File Selection Handler
  const handleFileSelect = async (file: File) => {
    await handleFileUpload(file)
  }

  // Re-upload Handler
  const handleReupload = () => {
    setError(null)
    fileInputRef.current?.click()
  }

  // Message Send Handler
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    setError(null)

    const messageId = crypto.randomUUID()
    const userMessage: Message = {
      id: messageId,
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // ส่งข้อความไปยัง API ที่ถูกต้อง
      const response = await fetch('https://xawfeg5xdu3cnj-7860.proxy.runpod.net/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      if (!data.response) throw new Error('Invalid response format')

      // Add AI response
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        isSpeaking: true
      }])
    } catch (error) {
      // Error handling
      console.error('Error:', error)
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      setError(errorMessage)
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, there was an error processing your message. Please try again.',
        timestamp: new Date(),
        error: true
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-slate-950 via-[#020817] to-slate-950">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(56,189,248,0.13)_0%,rgba(56,189,248,0)_100%)]" />
      <div className="absolute top-20 right-20 w-40 h-40 bg-indigo-600/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-40 left-20 w-56 h-56 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ErrorMessage message={error} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative">
        {messages.length === 0 ? (
          <div className="text-center absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 mb-8">
              <img 
                src="/img/video-unscreen.gif"
                alt="AI Avatar"
                className="w-full h-full object-cover rounded-full border-4 border-cyan-400/30"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-white">
              AI Financial Assistant
            </h1>
            <p className="text-white/90 text-lg">
              Start chatting with our AI assistant
            </p>
          </div>
        ) : (
          messages.map((message) => (
            message.role === 'user' ? (
              <UserMessage key={message.id} message={message} />
            ) : (
              <AssistantMessage
                key={message.id}
                message={message}
                onSpeakingComplete={() => {
                  setMessages(prev => prev.map(msg => 
                    msg.id === message.id ? { ...msg, isSpeaking: false } : msg
                  ))
                }}
              />
            )
          ))
        )}
        {(loading || uploading) && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <ChatInput
        input={input}
        setInput={setInput}
        loading={loading}
        uploading={uploading}
        uploadedFile={uploadedFile}
        sendMessage={sendMessage}
        onFileSelect={handleFileSelect}
      />
    </div>
  )
}
