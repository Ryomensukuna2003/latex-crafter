"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Code, FileText, Loader2, Play } from "lucide-react"
import useLatexStore from "@/lib/store"
import Link from "next/link"
import CodeMirror from "@uiw/react-codemirror"
import { StreamLanguage } from "@codemirror/language"
import { stex } from "@codemirror/legacy-modes/mode/stex"
import { vscodeDark } from "@uiw/codemirror-theme-vscode"

export default function PreviewPage() {
  const latexCode = useLatexStore((state) => state.latexOutput)
  const setLatexCode = useLatexStore((state) => state.setLatexOutput)
  const [isCompiling, setIsCompiling] = useState(false)
  const [pdfUrl, setPdfUrl] = useState("")

  useEffect(() => {
    if (latexCode) handleCompile()
  }, [])

  const handleCompile = async () => {
    setIsCompiling(true)
    try {
      const res = await fetch("http://20.244.83.191:3001/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ latex: latexCode }),
      })

      if (!res.ok) {
        setLatexCode("Error: Failed to compile LaTeX")
        throw new Error("Failed to compile LaTeX")
      }

      const blob = await res.blob()
      console.log("pdf-> ", blob)
      const url = URL.createObjectURL(blob)
      setPdfUrl(url)
    } catch (error) {
      console.error("Error compiling LaTeX:", error)
    } finally {
      setIsCompiling(false)
    }
  }

  const handleDownload = () => {
    if (!pdfUrl) return
    const a = document.createElement("a")
    a.href = pdfUrl
    a.download = "resume.pdf"
    a.click()
  }

  const handleCodeChange = (value) => {
    setLatexCode(value)
  }

  return (
    <main className="h-screen w-screen flex flex-col overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <Link href="/">
          <Button variant="ghost" size="sm">
            ← Back
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Resume Editor</h1>
        <div className="flex gap-2">
          <Button onClick={handleCompile} disabled={isCompiling} size="sm">
            {isCompiling ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Compiling...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Build PDF
              </>
            )}
          </Button>
          <Button onClick={handleDownload} variant="outline" disabled={!pdfUrl} size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 flex-1 overflow-hidden">
        <div className="flex flex-col h-full border-r">
          <div className="bg-secondary p-2 flex items-center">
            <Code className="h-4 w-4 mr-2" />
            <span className="font-medium">LaTeX Editor</span>
          </div>
          <div className="flex-1 overflow-hidden bg-slate-950 relative">
            <div className="absolute inset-0 overflow-auto">
              <CodeMirror
                value={latexCode}
                height="100%"
                width="100%"
                onChange={handleCodeChange}
                theme={vscodeDark}
                extensions={[StreamLanguage.define(stex)]}
                basicSetup={{
                  lineNumbers: true,
                  highlightActiveLine: true,
                  highlightSpecialChars: true,
                  foldGutter: true,
                  dropCursor: true,
                  allowMultipleSelections: true,
                  indentOnInput: true,
                  syntaxHighlighting: true,
                  bracketMatching: true,
                  closeBrackets: true,
                  autocompletion: true,
                  rectangularSelection: true,
                  crosshairCursor: true,
                  highlightSelectionMatches: true,
                  closeBracketsKeymap: true,
                  defaultKeymap: true,
                  searchKeymap: true,
                  historyKeymap: true,
                  foldKeymap: true,
                  completionKeymap: true,
                  lintKeymap: true,
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full">
          <div className="bg-secondary p-2 flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            <span className="font-medium">PDF Preview</span>
          </div>
          <div className="flex-1 overflow-auto bg-slate-100">
            {isCompiling ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                <p className="text-muted-foreground">Compiling your LaTeX code...</p>
              </div>
            ) : pdfUrl ? (
              <iframe src={pdfUrl} className="w-full h-full border-0" title="Resume PDF Preview" />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Build the PDF to preview it.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
