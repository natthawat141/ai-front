'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChatInput } from './components/ChatInput'

interface Message {
  id: string
  role: 'user' | 'assistant' 
  content: string
  timestamp: Date
  error?: boolean
}

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

export default function ChatPage() {
  // States
  const [messages, setMessages] = useState<Message[]>([{
    id: crypto.randomUUID(),
    role: 'assistant',
    content: 'สวัสดีครับ ผมเป็นผู้ช่วยด้านการลงทุนและการเงิน ยินดีให้คำปรึกษาครับ',
    timestamp: new Date()
  }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Effects
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    scrollToBottom()
    const timeoutId = setTimeout(scrollToBottom, 100)
    return () => clearTimeout(timeoutId)
  }, [messages])

  // Handlers
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('https://xawfeg5xdu3cnj-7860.proxy.runpod.net/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: input })
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])

    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'ขออภัย เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง',
        timestamp: new Date(),
        error: true
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-[#0A0F1C] to-[#1A1F2C] text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(56,189,248,0.13)_0%,rgba(56,189,248,0)_100%)]" />
      <div className="absolute top-20 right-20 w-40 h-40 bg-indigo-600/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-40 left-20 w-56 h-56 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />

      {/* Header */}
      <div className="p-4 text-center bg-black/20 font-semibold text-lg">
        Avatar Chat
      </div>

      <div className="flex-1 flex">
        {/* Left Side - Avatar */}
        <div className="w-1/2 relative overflow-hidden border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <div className="absolute inset-0 scale-110">
            <div className="absolute inset-0 bg-[#0A0F1C]/30 z-10" />
            
            <img
              src="/img/video-unscreen.gif"
              alt="AI Avatar"
              className="w-full h-full object-cover transform scale-125"
            />
            
            <div className="absolute inset-0 bg-gradient-to-r 
              from-[#0A0F1C]/50 
              via-transparent 
              to-[#0A0F1C]/80"
            />
            <div className="absolute inset-0 bg-gradient-to-t 
              from-[#0A0F1C]/40
              to-transparent"
            />
            <div className="absolute inset-0 bg-gradient-to-b 
              from-[#0A0F1C]/40
              to-transparent"
            />
          </div>
        </div>

        {/* Right Side - Chat */}
        <div className="w-1/2 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] p-4 rounded-xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                    : message.error
                      ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                      : 'bg-white/10 text-white/90 border border-cyan-500/20'
                }`}>
                  <p className="break-words">{message.content}</p>
                </div>
              </motion.div>
            ))}
            
            {loading && <LoadingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Section */}
      <ChatInput
        input={input}
        loading={loading}
        setInput={setInput}
        onSendMessage={handleSendMessage}
      />
    </div>
  )
}