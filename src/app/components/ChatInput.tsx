
'use client'
import { IoSend } from 'react-icons/io5'
import { FiRefreshCw } from 'react-icons/fi'
import { motion } from 'framer-motion'

interface ChatInputProps {
  input: string
  setInput: (value: string) => void
  loading: boolean
  uploadedFile: any
  handleReupload: () => void
  sendMessage: (e: React.FormEvent) => void
}

export const ChatInput = ({
  input,
  setInput,
  loading,
  uploadedFile,
  handleReupload,
  sendMessage
}: ChatInputProps) => {
  return (
    <div className="border-t border-white/10 p-4 bg-black/20 backdrop-blur-sm">
      <form onSubmit={sendMessage} className="max-w-4xl mx-auto flex gap-2">
        {uploadedFile && (
          <motion.button
            type="button"
            onClick={handleReupload}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center flex-shrink-0 w-12 h-12 
              bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl 
              transition-all group backdrop-blur-sm"
            title="Upload new file"
          >
            <FiRefreshCw className="w-5 h-5 text-white/70 group-hover:text-cyan-400" />
          </motion.button>
        )}

        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about stocks, market analysis, or financial advice..."
            className="w-full p-4 pr-12 bg-white/5 border border-white/10 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-cyan-500/30
              placeholder-white/50 text-white backdrop-blur-sm"
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2
              text-white/70 hover:text-cyan-400 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoSend className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  )
}