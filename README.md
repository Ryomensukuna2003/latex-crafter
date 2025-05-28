
# Latex-crafter

> [!IMPORTANT]  
> If there is an error when you hit upload, it's not a skill issue; it's Vercel that won't allow requests to listen for more than 10 seconds on free tier, so you have to run it locally. 

## Introduction

AI Resume Builder is a web application that leverages AI to create professional resumes in LaTeX format. Users can either upload their existing resume for automatic parsing or manually input their information through a step-by-step form. The application generates a LaTeX document that can be edited and downloaded as a PDF.

## Techbase

The application is built with Next.js for the frontend and Node.js for the backend. It uses AI models for parsing and generating LaTeX code.

<img src="https://skillicons.dev/icons?i=nextjs,react,nodejs,tailwind,express&theme=dark" alt="Tech Stack" />

## Features

- **Upload Existing Resume**: Parse PDF resumes and extract information automatically
- **Form-Based Resume Creation**: Step-by-step form for manually entering resume information
- **Real-time LaTeX Editor**: Edit the generated LaTeX code directly in the browser
- **PDF Preview**: View the compiled PDF in real-time
- **Download PDF**: Download the final resume as a PDF file

## Architecture

### Frontend (Next.js)

- **Upload Page**: For uploading existing resumes
- **Form Page**: Multi-step form for manually entering resume information
- **Preview Page**: Combined LaTeX editor and PDF preview
- **UI Components**: Reusable UI components built with shadcn/ui and styled with Tailwind CSS

### Backend

- **PDF Processing API**: Extracts text from uploaded PDF resumes
- **LaTeX Generation API**: Generates LaTeX code from structured data
- **PDF Compilation Service**: Converts LaTeX code to PDF using LaTeX compiler

## AI Integration

- **PDF Parsing**: Extracts structured information from uploaded PDF resumes
- **LaTeX Generation**: Creates professional LaTeX resume templates based on user data
- **Text Formatting**: Optimizes descriptions and achievements for maximum impact

## Installation

To set up the AI Resume Builder locally, follow these steps:

1. **Clone the repository:**

   ```sh
   https://github.com/Ryomensukuna2003/latex-crafter.git
   cd ai-resume-builder
   npm i 
   ```

3. **Create a `.env`:**

   ```
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start the frontend development server:**

   ```sh
   npm run dev
   ```

5. **Install backend dependencies:**

   ```sh
   cd ../Backend
   npm install
   node index.js
   ```

## Usage

1. **Access the application:** Open your web browser and navigate to `http://localhost:3000`

2. **Create a resume:**
   - Upload an existing resume PDF
   - Or fill out the form with your information

3. **Edit and preview:**
   - Edit the generated LaTeX code if needed
   - Preview the compiled PDF in real-time

4. **Download your resume:**
   - Download the final PDF resume

## Backend Requirements

The backend requires LaTeX to be installed on local or cloud machine for compilation:

```sh
apt-get update && apt-get install -y texlive-full
```

## Future Enhancements 

- Multiple resume templates
- Resume scoring and optimization suggestions
- ATS compliance checking
- Integration with job platforms
- Cloud storage for saved resumes
