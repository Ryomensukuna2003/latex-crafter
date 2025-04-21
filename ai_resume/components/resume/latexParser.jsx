'use client'

import { useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

export default function LatexRenderer({ latexCode }) {
  const containerRef = useRef(null)
  
  useEffect(() => {
    if (!latexCode || !containerRef.current) return
    
    try {
      katex.render(latexCode, containerRef.current, {
        throwOnError: false,
        displayMode: true
      })
    } catch (error) {
      containerRef.current.innerHTML = `<pre style="color: red;">${error.message}</pre>`
    }
  }, [latexCode])
  
  return <div ref={containerRef} className="prose max-w-none" />
}