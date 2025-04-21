"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Code, FileText, Loader2, Play } from "lucide-react";
import useLatexStore from "@/lib/store";
import Link from "next/link";

export default function PreviewPage() {
  const latexCode = useLatexStore((state) => state.latexOutput);
  const setLatexCode = useLatexStore((state) => state.setLatexOutput);
  const [isCompiling, setIsCompiling] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  useEffect(() => {
    if (latexCode) handleCompile();
  }, []);

  const handleCompile = async () => {
    setIsCompiling(true);
    try {
      const res = await fetch("http://20.244.83.191:3001/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ latex: latexCode }),
      });

      if (!res.ok) {
        setLatexCode("Error: Failed to compile LaTeX");
        throw new Error("Failed to compile LaTeX");
      }

      const blob = await res.blob();
      console.log("pdf-> ", blob);
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error("Error compiling LaTeX:", error);
    } finally {
      setIsCompiling(false);
    }
  };

  const handleDownload = () => {
    if (!pdfUrl) return;
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "resume.pdf";
    a.click();
  };

  const handleTextareaChange = (e) => {
    setLatexCode(e.target.value);
  };

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Resume Editor</h1>
          <div className="flex gap-2">
            <Button onClick={handleCompile} disabled={isCompiling}>
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
            <Button
              onClick={handleDownload}
              variant="outline"
              disabled={!pdfUrl}
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="h-[calc(100vh-200px)] overflow-hidden">
            <div className="bg-secondary p-2 flex items-center">
              <Code className="h-4 w-4 mr-2" />
              <span className="font-medium">LaTeX Editor</span>
            </div>
            <CardContent className="p-0 h-full">
              <div className="h-full overflow-auto bg-slate-950 p-4">
                <textarea
                  value={latexCode}
                  onChange={handleTextareaChange}
                  className="w-full h-full bg-transparent text-slate-50 font-mono text-sm resize-none outline-none"
                  spellCheck="false"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="h-[calc(100vh-200px)] overflow-hidden">
            <div className="bg-secondary p-2 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              <span className="font-medium">PDF Preview</span>
            </div>
            <CardContent className="p-0 h-full overflow-auto bg-slate-100">
              <div className="flex items-center justify-center h-full">
                {isCompiling ? (
                  <div className="flex flex-col items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                    <p className="text-muted-foreground">
                      Compiling your LaTeX code...
                    </p>
                  </div>
                ) : pdfUrl ? (
                  <iframe
                    src={pdfUrl}
                    className="w-full h-full border-0"
                    title="Resume PDF Preview"
                  />
                ) : (
                  <p className="text-muted-foreground">
                    Build the PDF to preview it.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
