import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = "gemini-1.5-pro-latest";

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(request) {
  try {
    const rawBody = await request.text();
    const parsedBody = JSON.parse(rawBody);
    const pdfData = parsedBody.pdfData;
    if (!pdfData) {
      return NextResponse.json(
        { message: "No PDF data received" },
        { status: 400 }
      );
    }
    const expandedJsonText = JSON.stringify(pdfData, null, 2); // 2-space indentation
    console.log("Expanded - ", expandedJsonText);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const prompt = `
    # Resume Parser and LaTeX Generator
    
    ## Task
    Parse the following unstructured text extracted from a PDF resume and convert it into a well-structured LaTeX document using the specific template format provided.
    
    ## Raw PDF Text Data
    \`\`\`
    ${expandedJsonText}
    \`\`\`
    
    ## Instructions
    Generate a complete, compilable LaTeX resume document that follows EXACTLY the template structure below. Use the appropriate LaTeX commands for each section and ensure the formatting matches the template exactly.
    
    ## LaTeX Template Example
    
    The resume should use these specific commands:
    - \\resumeSubheading for positions/degrees with organization and date
    - \\resumeItem for bullet points
    - \\resumeProjectHeading for projects with links and technologies
    
    The document should begin with:
    \`\`\`latex
    \\documentclass[letterpaper,11pt]{article}
    
    \\usepackage{latexsym}
    \\usepackage[margin=0.5in]{geometry}
    \\usepackage{titlesec}
    \\usepackage{marvosym}
    \\usepackage[usenames,dvipsnames]{color}
    \\usepackage{verbatim}
    \\usepackage{enumitem}
    \\usepackage[hidelinks]{hyperref}
    \\usepackage{fancyhdr}
    \\usepackage[english]{babel}
    \\usepackage{tabularx}
    \\input{glyphtounicode}
    
    % Custom commands
    
    \\titleformat{\\section}{
      \\vspace{-4pt}\\scshape\\raggedright\\large
    }{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]
    
    
    \\newcommand{\\resumeItem}[1]{
      \\item\\small{
        {#1 \\vspace{-2pt}}
      }
    }
    
    \\newcommand{\\resumeSubheading}[4]{
      \\vspace{-2pt}\\item
        \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
          \\textbf{#1} & #2 \\\\
          \\textit{\\small#3} & \\textit{\\small #4} \\\\
        \\end{tabular*}\\vspace{-7pt}
    }
    
    \\newcommand{\\resumeProjectHeading}[2]{
        \\item
        \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
          \\small#1 & #2 \\\\
        \\end{tabular*}\\vspace{-7pt}
    }
    
    \\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
    \\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
    \\newcommand{\\resumeItemListStart}{\\begin{itemize}}
    \\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}
    \`\`\`
    
    ## Section Formats
    
    ### Personal Information
    \`\`\`latex
    \\begin{center}
        {\\Huge \\textbf{\\href{https://website.com/}{Name}}} \\\\ \\vspace{1pt}
        \\small +12345678901 $|$ \\href{mailto:email@example.com}{\\underline{email@example.com}} $|$
        \\href{https://linkedin.com/in/profile}{\\underline{linkedin.com/in/profile}} $|$
        \\href{https://github.com/username}{\\underline{github.com/username}}
    \\end{center}
    \`\`\`
    
    ### Education Section
    \`\`\`latex
    \\section{Education}
    \\resumeSubHeadingListStart
    \\resumeSubheading
    {Degree in Field}{Month Year -- Month Year}
    {Institution Name}{Location}
    \\resumeSubHeadingListEnd
    \`\`\`
    
    ### Skills Section
    \`\`\`latex
    \\section{Technical Skills}
    \\begin{itemize}[leftmargin=0.15in, label={}]
        \\small{\\item{
            \\textbf{Programming Languages}{: Language1, Language2, Language3} \\\\
            \\textbf{Frameworks \\& Libraries}{: Framework1, Framework2, Framework3} \\\\
            \\textbf{Database Management}{: Database1, Database2} \\\\
            \\textbf{Developer Tools}{: Tool1, Tool2, Tool3} \\\\
        }}
    \\end{itemize}
    \`\`\`
    
    ### Experience Section
    \`\`\`latex
    \\section{Professional Experience}
    \\resumeSubHeadingListStart
    \\resumeSubheading
    {Position}{Month Year -- Month Year}
    {Company}{Location}
    \\resumeItemListStart
    \\resumeItem{Accomplishment with metrics}
    \\resumeItem{Responsibility with impact}
    \\resumeItemListEnd
    \\resumeSubHeadingListEnd
    \`\`\`
    
    ### Projects Section
    \`\`\`latex
    \\section{Projects}
    \\resumeSubHeadingListStart
    \\resumeProjectHeading
    {\\textbf{Project Name} \\hspace{0.2em} \\small\\href{https://project-link.com/}{\\underline{Project Link}} $|$ \\small\\emph{Technologies Used}}{Month Year -- Month Year}
    \\resumeItemListStart
    \\resumeItem{Description of the project}
    \\resumeItem{Technical aspects implemented}
    \\resumeItemListEnd
    \\resumeSubHeadingListEnd
    \`\`\`
    
    ### Achievements Section
    \`\`\`latex
    \\section{Achievements}
    \\resumeItemListStart
    \\resumeItem{Achievement with metrics}
    \\resumeItem{Award or recognition}
    \\resumeItemListEnd
    \`\`\`
    
    ## Important Notes
    - Generate only the LaTeX code with no explanations or comments
    - Maintain exact LaTeX command structure from the template
    - Preserve all numerical metrics and percentages when describing achievements
    - Keep all URLs and links from the original document
    - Format dates consistently as "Month Year" or abbreviations like "Jan. 2023"
    - Do not include \`\`\`latex or \`\`\` at the end of the output, just give the pure LaTeX code
    `;


    const result = await model.generateContent(prompt);
    const generatedLatex = result.response.text();
    console.log("Generated LaTeX:", generatedLatex);

    return new NextResponse(generatedLatex, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error processing PDF data:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error processing PDF data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  return NextResponse.json(
    {
      message: "Resume LaTeX generator API is active",
      status: "Ready to process PDF data",
    },
    {
      status: 200,
      statusText: "OK",
    }
  );
}
