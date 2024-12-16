'use client'

export default function PdfViewer() {
  return (
    <div className="w-full h-screen bg-[#020817]">
      <iframe 
        src="../img/k.pdf"
        className="w-full h-full border-none"
        title="PDF Viewer"
      />
    </div>
  )
}