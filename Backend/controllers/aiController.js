import { GoogleGenerativeAI } from "@google/generative-ai";
import pdfParse from "pdf-parse";
import fs from "fs";

export const generateOnePager = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF file uploaded." });
    }

    const API_KEY = process.env.GOOGLE_API_KEY;
    if (!API_KEY || API_KEY.includes("your") || API_KEY === "MOCK") {
      console.log("Using Mock Data for One-Pager API...");
      return res.json({
        title: "Mock AI One-Pager: Selected Chapter",
        keyConcepts: ["Concept 1: Core Principles", "Concept 2: Fundamental Laws", "Concept 3: Practical Applications"],
        importantFormulas: [
          { name: "Placeholder Formula A", equation: "A^2 + B^2 = C^2" },
          { name: "Placeholder Formula B", equation: "E = mc^2" }
        ],
        weaknessAreasToFocus: ["Advanced derivations", "Unit conversions in Part B"],
        quickSummary: "This is a brilliantly generated AI summary using Mock Data because no valid API key was found. It highlights the core ideas of the document you uploaded."
      });
    }

    // Read and parse PDF
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);
    const textContext = pdfData.text;

    // Optional: Clean up uploaded file
    fs.unlinkSync(req.file.path);

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prompt Engineering
    const prompt = `
      You are an expert AI tutor helping students prepare for competitive exams like JEE, NEET, or UPSC.
      I have provided the text from a chapter/study material below.
      
      Generate a concise "One-Pager Revision Sheet" strictly based on this material. 
      Format the output in JSON with the following structure:
      {
        "title": "Main topic of the chapter",
        "keyConcepts": ["Concept 1", "Concept 2", ...],
        "importantFormulas": [{"name": "Formula Name", "equation": "Formula Equation"}],
        "weaknessAreasToFocus": ["Topic 1 to focus on", "Topic 2 to focus on"],
        "quickSummary": "A very concise 3-4 line summary of the entire text"
      }
      
      Ensure the output is valid JSON.
      
      Material:
      ${textContext}
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Try to parse the resulting text to JSON
    // Gemini sometimes wraps JSON in markdown blocks like ```json ... ```
    let jsonOutput = responseText;
    if (jsonOutput.includes('```json')) {
      jsonOutput = jsonOutput.split('```json')[1].split('```')[0].trim();
    } else if (jsonOutput.includes('```')) {
      jsonOutput = jsonOutput.split('```')[1].split('```')[0].trim();
    }

    const finalData = JSON.parse(jsonOutput);
    res.json(finalData);

  } catch (error) {
    console.error("Error generating One-Pager:", error);
    res.status(500).json({ error: "Failed to generate the One-Pager." });
  }
};
