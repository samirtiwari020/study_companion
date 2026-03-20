import { GoogleGenerativeAI } from "@google/generative-ai";

export const generatePracticeQuestion = async (req, res) => {
  try {
    const { topic, difficulty = "Medium" } = req.body;
    
    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const API_KEY = process.env.GOOGLE_API_KEY;
    if (!API_KEY || API_KEY.includes("your") || API_KEY === "MOCK") {
      console.log("Using Mock Data for Practice API...");
      const mockQuestions = Array(5).fill(null).map((_, i) => ({
        question: `Mock Question ${i + 1} regarding ${topic} (${difficulty} difficulty). What is the expected outcome?`,
        options: ["Result A", "Result B", "Result C", "Result D"],
        correctAnswerIndex: Math.floor(Math.random() * 4),
        hint1: "This is a mock hint 1. Think about the basic definition.",
        hint2: "This is mock hint 2. Apply the main formula.",
        solution: `This is a mock solution for question ${i + 1}. The correct answer was generated using fallback data because the Gemini API key was invalid.`
      }));
      return res.json(mockQuestions);
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an expert examiner for competitive exams taking place in India like JEE, NEET, or UPSC. 
      Generate exactly 5 practice questions on the topic: "${topic}" with difficulty: "${difficulty}".
      
      Format your response strictly as a JSON ARRAY of objects. Here is the structure for each object:
      {
        "question": "The text of the question",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswerIndex": 0, // 0 to 3 index of the correct option
        "hint1": "The first subtle clue to start thinking in the right direction (do not give the answer).",
        "hint2": "A stronger hint or formula required to solve it.",
        "solution": "The complete step-by-step explanation and final answer."
      }

      Return only the valid JSON array.
    `;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    if (responseText.includes('```json')) {
      responseText = responseText.split('```json')[1].split('```')[0].trim();
    } else if (responseText.includes('```')) {
      responseText = responseText.split('```')[1].split('```')[0].trim();
    }

    let finalData;
    try {
      finalData = JSON.parse(responseText);
    } catch (e) {
       console.error("JSON parse failed:", responseText);
       return res.status(500).json({ error: "AI returned malformed data. Try again." });
    }

    res.json(finalData);

  } catch (error) {
    console.error("Error generating question:", error);
    // Send standard error to frontend
    res.status(500).json({ error: error.message || "Failed to generate practice questions." });
  }
};
