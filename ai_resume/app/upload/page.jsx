"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileUp, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import useLatexStore from "@/lib/store";

import pdfToText from "react-pdftotext";
import axios from "axios";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [parsedText, setParsedText] = useState("");
  const [parseError, setParseError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isParsingPdf, setIsParsingPdf] = useState(false);
  const [result, setResult] = useState(null);
  const router = useRouter();
  const setLatexOutput = useLatexStore((state) => state.setLatexOutput);
  // const { setLatexOutput } = useLatexStore();

  useEffect(() => {
    if (file) {
      console.log("File set, attempting to read:", file.name);
      setIsParsingPdf(true);
      setParsedText("");
      setParseError(null);

      pdfToText(file)
        .then((text) => {
          console.log("PDF successfully parsed");
          setParsedText(text);
          setIsParsingPdf(false);
        })
        .catch((error) => {
          console.error("Failed to extract text from pdf:", error);
          setParseError(
            "Failed to extract text from the PDF. Please try another file."
          );
          setIsParsingPdf(false);
        });
    }
  }, [file]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files?.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      console.log("File dropped:", droppedFile.name, droppedFile.type);

      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      } else {
        alert("Please select a PDF file");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files?.length > 0) {
      const selectedFile = e.target.files[0];
      console.log("File selected:", selectedFile.name, selectedFile.type);

      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        alert("Please select a PDF file");
      }
    }
  };

  const handleUpload = async () => {
    if (!file || isParsingPdf) return;
    setIsUploading(true);
    // Send to API
    try {
      const result = await axios.post(
        "/api/pdfResume",
        { pdfData: parsedText },
        { responseType: "text" }
      );
      setLatexOutput(result.data);
      setResult(result.data);
      setIsUploading(false);

      const currentState = useLatexStore.getState();
      console.log(
        "Store state after update:",
        currentState.latexOutput.substring(0, 50)
      );
      router.push("/preview");
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsUploading(false);
      alert("Failed to process the file. Please try again.");
    }
  };

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="md">
              ← Back to Home
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">Upload Your Resume</h1>

        <Card>
          <CardContent className="pt-6">
            <div
              className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors duration-200 ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-upload").click()}
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileUp className="h-6 w-6 text-primary" />
              </div>

              <h3 className="text-lg font-medium mb-2">
                {file ? file.name : "Drag and drop your resume"}
              </h3>

              <p className="text-sm text-muted-foreground mb-4">
                {file
                  ? `${(file.size / 1024).toFixed(2)} KB`
                  : "Supports PDF files up to 10MB"}
              </p>

              <Input
                id="file-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />

              {!file && (
                <Button
                  variant="outline"
                  className="transition-transform hover:scale-105"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Select File
                </Button>
              )}

              {file && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpload();
                  }}
                  disabled={isUploading || isParsingPdf}
                  className="mt-2 relative transition-all"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : isParsingPdf ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Parsing PDF...
                    </>
                  ) : (
                    <>
                      <span className="flex items-center justify-center">
                        Process Resume
                      </span>
                    </>
                  )}
                </Button>
              )}
            </div>

            {isParsingPdf && (
              <div className="mt-6 p-4 border rounded-lg bg-blue-50 animate-pulse">
                <div className="flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span>Parsing PDF content...</span>
                </div>
              </div>
            )}

            {parseError && (
              <div className="mt-6 p-4 border rounded-lg bg-red-50 text-red-700">
                <h4 className="font-medium mb-2">Error parsing PDF:</h4>
                <p>{parseError}</p>
              </div>
            )}

            {parsedText && !isParsingPdf && (
              <div className="mt-6 p-4 border rounded-lg bg-gray-50 max-h-60 overflow-y-auto">
                <h4 className="flex font-medium justify-center mb-2">
                  Parsed Sucessfully{" "}
                </h4>
                <p className="whitespace-pre-wrap text-sm">
                  {result ? result : "fetching"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
