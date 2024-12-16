// app/page.tsx
'use client'

/**
 * Main Page Component
 * Implements AI Financial Assistant with chat and PDF analysis capabilities
 */

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUpload, FiAlertCircle } from 'react-icons/fi'
import { ChatInput } from './components/ChatInput'
import AnalysisResult from './components/analysis/AnalysisResult'
import type { AnalysisData } from './components/analysis/types'
import { TextToSpeech } from './components/analysis/TextToSpeech'
import StockComparison from './components/analysis/StockComparison';
import {QuickPdfSelector} from './components/QuickPdfSelector'
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
// Type Definitions
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  analysis?: AnalysisData | null
  error?: boolean
}

interface UploadedFile {
  name: string
  timestamp: Date
}

// Loading Component
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

// Error Display Component
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



/**
 * Main Page Component
 * Contains all the logic for chat, file upload, and UI management
 */

export default function Page() {
  // State Management
  const [messages, setMessages] = useState<Message[]>([])        // Chat messages
  const [input, setInput] = useState('')                        // Input field
  const [loading, setLoading] = useState(false)                 // Message loading
  const [uploading, setUploading] = useState(false)            // File upload loading
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)  // Current file
  const [error, setError] = useState<string | null>(null)      // Error state

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)          // For auto-scroll
  const fileInputRef = useRef<HTMLInputElement>(null)          // File input reference

  // Auto-scroll effect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  /**
   * File Validation
   * Checks file type and size constraints
   */
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
  // เพิ่ม state สำหรับ toggle
const [showPdfSelector, setShowPdfSelector] = useState(true);


  /**
   * File Upload Handler
   * Processes PDF upload and triggers analysis
   */
  const handleFileUpload = async (file: File) => {
    if (!file || !validateFile(file)) return
    setError(null)
    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('https://0bmgl5wq4fwo9m-7860.proxy.runpod.net/analyze', {
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
        analysis: data.result
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

  /**
   * File Selection Handler
   * Bridge between file selection and upload
   */
  const handleFileSelect = async (file: File) => {
    await handleFileUpload(file)
  }

  /**
   * Re-upload Handler
   * Triggers new file selection
   */
  const handleReupload = () => {
    setError(null)
    fileInputRef.current?.click()
  }

  const handleQuickPdfSelect = async (pdfName: string) => {
    try {
      const response = await fetch(pdfName);
      const blob = await response.blob();
      const filename = pdfName.split('/').pop() || pdfName;
      const file = new File([blob], filename, { type: 'application/pdf' });
      handleFileSelect(file);
    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  }


  /**
   * Message Send Handler
   * Processes user messages and gets AI responses
   */
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    setError(null)

    // Create and add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // Send message to API
      const response = await fetch('https://0bmgl5wq4fwo9m-7860.proxy.runpod.net/chat', {
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
        timestamp: new Date()
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
     
      {/* QuickPdfSelector with toggle button */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 ">
      <AnimatePresence>
        {showPdfSelector && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <QuickPdfSelector onSelectPdf={handleQuickPdfSelect} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Toggle Button */}
      <motion.button
        onClick={() => setShowPdfSelector(!showPdfSelector)}
        className="mt-2 mx-auto flex items-center gap-2 px-3 py-2 
          bg-white/5 hover:bg-white/10 rounded-full 
          text-white/70 hover:text-white 
          transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {showPdfSelector ? (
          <>
            <span className="text-sm">Hide PDFs</span>
            <FiChevronDown className="w-4 h-4" />
          </>
        ) : (
          <>
            <span className="text-sm">Show PDFs</span>
            <FiChevronUp className="w-4 h-4" />
          </>
        )}
      </motion.button>
    </div>


     {/* Messages Area */}
     <div className="flex-1 overflow-y-auto p-6 space-y-4 relative">
       {messages.length === 0 ? (
         <div className="text-center absolute inset-0 flex flex-col items-center justify-center">
           <h1 className="text-4xl font-bold mb-4 text-white">
             AI Financial Assistant
           </h1>
           <p className="text-white/90 text-lg">
             Start chatting with our AI assistant
           </p>
           <p className="text-white/75 text-sm mt-2">
             Try asking about stock analysis, market trends, or upload a financial document
           </p>
         </div>
       ) : (
         messages.map((message) => (
           <motion.div
             key={message.id}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
           >
             <div className={`
               max-w-[80%] p-4 rounded-xl
               ${message.role === 'user'
                 ? 'bg-gradient-to-r from-cyan-500/90 to-blue-600/90 text-white backdrop-blur-sm'
                 : message.error
                   ? 'bg-red-500/10 backdrop-blur-sm border border-red-500/20 text-red-400'
                   : 'bg-white/5 backdrop-blur-sm border border-white/10 text-white/90'
               }
             `}>
               {message.analysis ? (
                 <div>
                   <AnalysisResult data={message.analysis} />
                   {message.analysis.peer_companies && (
                     <StockComparison data={message.analysis.peer_companies} />
                   )}
                 </div>
               ) : (
                 <p className="text-sm md:text-base whitespace-pre-wrap">
                   {message.content}
                 </p>
               )}
             </div>

             {message.role === 'assistant' && (
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="mt-2 mr-2"
               >
                 <TextToSpeech
                   text={message.analysis ? (message.analysis.ai_recommendations || '') : message.content}
                   className="bg-white/5 hover:bg-white/10 rounded-full p-2"
                 />
               </motion.div>
             )}
           </motion.div>
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