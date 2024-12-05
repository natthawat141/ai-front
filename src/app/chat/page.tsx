'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiVolume2 } from 'react-icons/fi'
import { FaRegFilePdf } from 'react-icons/fa'
import { ChatInput } from './components/ChatInput'
import StockDetail from './components/StockDetail'
import { StockData } from './types/stock'
import './styles/scrollbar.css'

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
    error?: boolean
}

interface UploadedFile {
    name: string
    timestamp: Date
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
    const [messages, setMessages] = useState<Message[]>([{
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'สวัสดีครับ ผมเป็นผู้ช่วยด้านการลงทุนและการเงิน ยินดีให้คำปรึกษาครับ',
        timestamp: new Date()
    }])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
    const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null)
    const [stockData, setStockData] = useState<StockData | null>(null)
    const [stockLoading, setStockLoading] = useState(false)
    const [stockError, setStockError] = useState<string | null>(null)

    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Auto-scroll effect
    useEffect(() => {
        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
        scrollToBottom()
        const timeoutId = setTimeout(scrollToBottom, 100)
        return () => clearTimeout(timeoutId)
    }, [messages])

    // Fetch stock data effect
    useEffect(() => {
        const fetchStockData = async () => {
            setStockLoading(true)
            setStockError(null)
            try {
                const response = await fetch('https://xawfeg5xdu3cnj-7860.proxy.runpod.net/stock-data')
                if (!response.ok) throw new Error('Failed to fetch stock data')
                const data = await response.json()
                setStockData(data)
            } catch (error) {
                console.error('Error fetching stock data:', error)
                setStockError(error instanceof Error ? error.message : 'Failed to load stock data')
            } finally {
                setStockLoading(false)
            }
        }
        
        fetchStockData()
    }, [])

    // Speech handler
    const handleSpeech = (text: string, messageId: string) => {
        if (!text || typeof window === 'undefined') return

        if (currentPlayingId === messageId) {
            window.speechSynthesis.cancel()
            setCurrentPlayingId(null)
            return
        }

        window.speechSynthesis.cancel()

        const speech = new SpeechSynthesisUtterance(text)
        speech.lang = 'th-TH'
        speech.rate = 1.0
        speech.pitch = 1.0
        speech.volume = 1.0

        speech.onstart = () => setCurrentPlayingId(messageId)
        speech.onend = () => setCurrentPlayingId(null)
        speech.onerror = () => setCurrentPlayingId(null)

        window.speechSynthesis.speak(speech)
    }

    // Message handler
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            })

            if (!response.ok) throw new Error('Network response was not ok')

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

    // File upload handler
    const handleFileSelect = async (file: File) => {
        if (!file) return
        setUploading(true)

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch('https://xawfeg5xdu3cnj-7860.proxy.runpod.net/analyze', {
                method: 'POST',
                body: formData
            })

            if (!response.ok) throw new Error('Network response was not ok')

            const data = await response.json()

            setUploadedFile({
                name: file.name,
                timestamp: new Date()
            })

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
                    content: data.result,
                    timestamp: new Date()
                }
            ])
        } catch (error) {
            console.error('Error:', error)
            setMessages(prev => [...prev, {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: 'ขออภัย เกิดข้อผิดพลาดในการวิเคราะห์ไฟล์ กรุณาลองใหม่อีกครั้ง',
                timestamp: new Date(),
                error: true
            }])
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="h-screen flex flex-col bg-gradient-to-b from-[#0A0F1C] to-[#1A1F2C] text-white overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(56,189,248,0.13)_0%,rgba(56,189,248,0)_100%)] pointer-events-none" />
            <div className="fixed top-20 right-20 w-40 h-40 bg-indigo-600/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />
            <div className="fixed bottom-40 left-20 w-56 h-56 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />

            {/* Header */}
            <div className="p-4 text-center bg-black/20 font-semibold text-lg backdrop-blur-sm">
                Avatar Chat
            </div>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Left Side - Avatar */}
                <div className="lg:w-1/2 h-[30vh] lg:h-full relative border-b lg:border-b-0 lg:border-r border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-[#0A0F1C]/30 z-10" />
                        <img
                            src="/img/video-unscreen.gif"
                            alt="AI Avatar"
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1C]/50 via-transparent to-[#0A0F1C]/80" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C]/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1C]/40 to-transparent" />
                    </div>
                </div>

                {/* Right Side - Chat */}
                <div className="lg:w-1/2 flex flex-col flex-1">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 
                        scrollbar-thin hover:scrollbar-thumb-cyan-500/50 
                        scrollbar-thumb-cyan-500/20 
                        scrollbar-track-white/5
                        hover:scrollbar-track-white/10
                        transition-colors">
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className="flex flex-col gap-2 max-w-[90%] md:max-w-[75%]">
                                    <div className={`p-4 rounded-xl ${
                                        message.role === 'user'
                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                                            : message.error
                                                ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                                                : 'bg-white/10 text-white/90 border border-cyan-500/20'
                                    }`}>
                                        <p className="break-words text-sm md:text-base">{message.content}</p>
                                    </div>

                                    {message.role === 'assistant' && !message.error && (
                                        <div className="flex gap-2 ml-2">
                                            <button
                                                onClick={() => handleSpeech(message.content, message.id)}
                                                className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full transition-colors"
                                            >
                                                {currentPlayingId === message.id ? (
                                                    <div className="flex space-x-1">
                                                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                                                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-75" />
                                                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-150" />
                                                    </div>
                                                ) : (
                                                    <FiVolume2 className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                                                )}
                                            </button>
                                            {uploadedFile && (
                                                <button className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full transition-colors">
                                                    <FaRegFilePdf className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}

                        {loading && <LoadingIndicator />}
                        
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Stock Detail Section */}
                    <div className="container mx-auto px-4 py-8">
                        {stockLoading ? (
                            <div className="flex justify-center items-center p-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
                            </div>
                        ) : stockError ? (
                            <div className="text-red-400 p-4 text-center">
                                {stockError}
                            </div>
                        ) : stockData ? (
                            <StockDetail data={stockData} />
                        ) : null}
                    </div>

                    {/* Input Section */}
                    <div className="p-4 bg-black/20 backdrop-blur-sm border-t border-cyan-500/20">
                        <ChatInput
                            input={input}
                            setInput={setInput}
                            loading={loading}
                            uploading={uploading}
                            uploadedFile={uploadedFile}
                            sendMessage={handleSendMessage}
                            onFileSelect={handleFileSelect}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}