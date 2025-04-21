import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-3">AI Resume Builder</h1>
          <p className="text-lg text-muted-foreground">Create a professional resume with the power of AI</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Existing Resume
              </CardTitle>
              <CardDescription>Upload your existing resume and we'll extract the information</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/upload">
                <Button className="w-full">Upload Resume</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Fill Out Form
              </CardTitle>
              <CardDescription>Manually enter your information to create a new resume</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/form">
                <Button className="w-full" variant="outline">
                  Start Form
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="p-4 rounded-lg border bg-card">
              <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mx-auto mb-3">
                <span className="font-medium text-primary">1</span>
              </div>
              <h3 className="font-medium mb-2">Provide Your Information</h3>
              <p className="text-sm text-muted-foreground">Upload your existing resume or fill out our form</p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mx-auto mb-3">
                <span className="font-medium text-primary">2</span>
              </div>
              <h3 className="font-medium mb-2">AI Processing</h3>
              <p className="text-sm text-muted-foreground">Our AI analyzes and formats your information</p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mx-auto mb-3">
                <span className="font-medium text-primary">3</span>
              </div>
              <h3 className="font-medium mb-2">Get Your Resume</h3>
              <p className="text-sm text-muted-foreground">Download your professionally formatted LaTeX resume</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
