"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiVolume2, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { FaRegFilePdf } from 'react-icons/fa';
import { ChatInput } from './components/ChatInput';
import AnalysisResult from '../components/analysis/AnalysisResult';
import StockComparison from '../components/analysis/StockComparison';
import { QuickPdfSelector } from '../components/QuickPdfSelector';
import './styles/scrollbar.css';

interface AnalysisData {
  ai_recommendations?: string;
  peer_companies?: any;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  analysis?: AnalysisData | null;
  error?: boolean;
}

interface UploadedFile {
  name: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: 'สวัสดีครับ ผมเป็นผู้ช่วยด้านการลงทุนและการเงิน ยินดีให้คำปรึกษาครับ',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [showPdfSelector, setShowPdfSelector] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    scrollToBottom();
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  // Text-to-Speech Handler
  const handleSpeech = (text: string, messageId: string) => {
    if (!text || typeof window === 'undefined') return;

    if (currentPlayingId === messageId) {
      window.speechSynthesis.cancel();
      setCurrentPlayingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'th-TH';
    speech.rate = 1.0;
    speech.pitch = 1.0;
    speech.volume = 1.0;

    speech.onstart = () => setCurrentPlayingId(messageId);
    speech.onend = () => setCurrentPlayingId(null);
    speech.onerror = () => setCurrentPlayingId(null);

    window.speechSynthesis.speak(speech);
  };

  // ส่งข้อความ
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://0bmgl5wq4fwo9m-7860.proxy.runpod.net/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.response || 'Analysis Result:',
        timestamp: new Date(),
        analysis: data.result || data.analysis || null,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'ขออภัย เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง',
          timestamp: new Date(),
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // เลือก PDF อย่างรวดเร็ว
  const handleQuickPdfSelect = async (pdfName: string) => {
    try {
      const response = await fetch(pdfName);
      const blob = await response.blob();
      const filename = pdfName.split('/').pop() || pdfName;
      const file = new File([blob], filename, { type: 'application/pdf' });
      handleFileSelect(file);
    } catch (error) {
      console.error('Error loading PDF:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'ขออภัย เกิดข้อผิดพลาดในการดาวน์โหลด PDF กรุณาลองใหม่อีกครั้ง',
          timestamp: new Date(),
          error: true,
        },
      ]);
    }
  };

  // อัปโหลดไฟล์
  const handleFileSelect = async (file: File) => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://0bmgl5wq4fwo9m-7860.proxy.runpod.net/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();

      setUploadedFile({
        name: file.name,
        timestamp: new Date(),
      });

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'user',
          content: `Uploaded: ${file.name}`,
          timestamp: new Date(),
        },
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'Analysis Result:',
          timestamp: new Date(),
          analysis: data.result || null,
        },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'ขออภัย เกิดข้อผิดพลาดในการวิเคราะห์ไฟล์ กรุณาลองใหม่อีกครั้ง',
          timestamp: new Date(),
          error: true,
        },
      ]);
    } finally {
      setUploading(false);
    }
  };


  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-[#0A0F1C] to-[#1A1F2C] text-white overflow-hidden">
      {/* Background Effects */}
      <div
        className="fixed inset-0 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(56,189,248,0.13)_0%,rgba(56,189,248,0)_100%)] pointer-events-none"
        aria-hidden="true"
        role="presentation"
      />
      <div
        className="fixed top-20 right-20 w-20 h-20 sm:w-40 sm:h-40 bg-indigo-600/10 rounded-full blur-[50px] sm:blur-[100px] animate-pulse pointer-events-none hidden sm:block"
        aria-hidden="true"
        role="presentation"
      />
      <div
        className="fixed bottom-20 sm:bottom-40 left-10 sm:left-20 w-28 h-28 sm:w-56 sm:h-56 bg-cyan-500/10 rounded-full blur-[80px] sm:blur-[120px] animate-pulse pointer-events-none hidden sm:block"
        aria-hidden="true"
        role="presentation"
      />

      {/* Header */}
      <header className="p-4 text-center bg-black/20 font-semibold text-base md:text-lg lg:text-xl backdrop-blur-sm" role="banner">
        <h1 className="text-lg md:text-xl lg:text-2xl">Avatar Chat</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden" role="main" aria-live="polite">
        {/* Left Side - Avatar */}
        <section
          className="lg:w-1/3 h-[20vh] sm:h-[30vh] lg:h-full relative border-b lg:border-b-0 lg:border-r border-cyan-500/20"
          aria-label="Avatar Section"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#0A0F1C]/30 z-10" />
            <img
              src={currentPlayingId ? "/img/video-unscreen.gif" : "/img/video-unscreen-still.jpg"}
              alt="AI Avatar animation"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </section>

        {/* Right Side - Chat */}
        <section
          className="lg:w-2/3 flex flex-col flex-1 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-20 scrollbar-track-white-5 hover:scrollbar-thumb-cyan-50 hover:scrollbar-track-white-10 transition-colors"
          aria-label="Chat Section"
        >
          <div className="flex-1 p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                role="listitem"
              >
                <div className="flex flex-col gap-2 max-w-[90%] md:max-w-[75%]">
                  <div
                    className={`p-4 rounded-xl ${message.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                        : message.error
                          ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                          : 'bg-white/10 text-white/90 border border-cyan-500/20'
                      }`}
                  >
                    {message.analysis ? (
                      <div>
                        <AnalysisResult data={message.analysis} />
                        {message.analysis.peer_companies && <StockComparison data={message.analysis.peer_companies} />}
                      </div>
                    ) : (
                      <p className="break-words text-sm md:text-base">{message.content}</p>
                    )}
                  </div>

                  {/* ปุ่ม Text-to-Speech */}
                  {message.role === 'assistant' && !message.error && (
                    <div className="flex gap-2 ml-2">
                      <button
                        onClick={() =>
                          handleSpeech(
                            message.analysis?.ai_recommendations || message.content,
                            message.id
                          )
                        }
                        className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full transition-colors"
                        aria-label="Play or Stop speech"
                      >
                        {currentPlayingId === message.id ? (
                          <div className="flex space-x-1" aria-hidden="true" role="presentation">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-75" />
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-150" />
                          </div>
                        ) : (
                          <FiVolume2 className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* แสดง Effect ระหว่าง AI กำลังประมวลผล */}
            {(loading || uploading) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center"
                role="status"
                aria-live="polite"
              >
                <div className="flex items-center gap-2 p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200" />
                  <span className="text-sm text-cyan-300">AI กำลังประมวลผล...</span>
                </div>
              </motion.div>
            )}
          </div>
        </section>





      </main>

      {/* QuickPdfSelector with toggle button */}
      <div className="absolute bottom-16 sm:bottom-24 left-1/2 -translate-x-1/2 z-10 mb-10">
        <AnimatePresence>
          {showPdfSelector && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              role="region"
              aria-label="Quick PDF Selector"
            >
              <QuickPdfSelector onSelectPdf={handleQuickPdfSelect} />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => setShowPdfSelector(!showPdfSelector)}
          className="mt-2 mx-auto flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle PDF selector"
          aria-expanded={showPdfSelector}
        >
          {showPdfSelector ? (
            <>
              <span className="text-sm">Hide PDFs</span>
              <FiChevronDown className="w-4 h-4" aria-hidden="true" />
            </>
          ) : (
            <>
              <span className="text-sm">Show PDFs</span>
              <FiChevronUp className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </motion.button>
      </div>

      {/* Input Section */}

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
  );

}
