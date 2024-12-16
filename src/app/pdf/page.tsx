'use client'
import Navbar from "../dev/components/Navbar"
import Link from 'next/link'

export default function PdfViewer() {
    const pdfs = [
        {
            name: 'KBank Q3 2024',
            path: '/img/k.pdf',
            link: '/pdf/kbank'  // ปรับ path ตามที่ต้องการ
        },
        {
            name: 'KBank Investor Presentation',
            path: '/img/KBank_Investor_Presentation_3Q24.pdf',
            link: '/pdf/kbank1'
        },
        {
            name: 'SCBX Report',
            path: '/img/sbcx.pdf',
            link: '/pdf/scbx'
        }
    ]

    return (
        <>
            <Navbar />
            <div className="flex flex-col h-screen bg-gradient-to-b from-slate-950 via-[#020817] to-slate-950">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(56,189,248,0.25)_0%,rgba(56,189,248,0)_100%)]" />
                <div className="absolute top-20 right-20 w-40 h-90 bg-indigo-400/30 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-40 left-20 w-96 h-56 bg-cyan-300/30 rounded-full blur-[120px] animate-pulse" />

                {/* เพิ่ม effects เสริม */}
                <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-purple-400/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/3 w-60 h-60 bg-blue-300/20 rounded-full blur-[100px] animate-pulse" />

                {/* Content */}
                <div className="container mx-auto px-4 py-8 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pdfs.map((pdf) => (
                            <div
                                key={pdf.path}
                                className="bg-slate-900/50 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm
                         border border-slate-800 hover:border-slate-700 transition-all duration-300"
                            >
                                <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex justify-between items-center">
                                    <h3 className="font-medium text-white">{pdf.name}</h3>
                                    <Link
                                        href={pdf.link}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
                             transition-colors duration-300 text-sm"
                                    >
                                        View Details
                                    </Link>
                                </div>
                                <div className="h-[600px] p-2">
                                    <iframe
                                        src={pdf.path}
                                        className="w-full h-full border-none rounded-lg"
                                        title={pdf.name}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}