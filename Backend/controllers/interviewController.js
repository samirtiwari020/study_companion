import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateInterviewQuestions = async (req, res) => {
  try {
    const { role = "UPSC IAS", topic = "General Studies & Ethics" } = req.body;
    
    const API_KEY = process.env.GOOGLE_API_KEY;
    if (!API_KEY || API_KEY.includes("your") || API_KEY === "MOCK") {
       console.log("Using Mock Data for Interview Generation...");
       return res.json({
         questions: [
           `Mock Question 1: How would you handle a crisis in ${topic} as a ${role}?`,
           `Mock Question 2: What are the ethical implications of this decision?`,
           `Mock Question 3: Can you walk us through your framework for solving complex problems?`
         ]
       });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Act as a senior UPSC/Exam board interviewer.
      The candidate is applying for the role: "${role}".
      Focus area: "${topic}".
      
      Generate exactly 3 tough, analytical interview questions to test the candidate's depth of knowledge, ethics, and decision-making.
      Return the response STRICTLY as a JSON array of strings:
      [
         "Question 1 text...",
         "Question 2 text...",
         "Question 3 text..."
      ]
    `;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    if (responseText.includes('```json')) {
      responseText = responseText.split('```json')[1].split('```')[0].trim();
    } else if (responseText.includes('```')) {
      responseText = responseText.split('```')[1].split('```')[0].trim();
    }
    
    res.json({ questions: JSON.parse(responseText) });
  } catch (error) {
    console.error("Error generating interview:", error);
    res.status(500).json({ error: error.message || "Failed to generate interview questions." });
  }
};

export const evaluateInterview = async (req, res) => {
  try {
    const { role = "UPSC IAS", qaPairs } = req.body;
    /* qaPairs format: [{ question: "...", answer: "..." }] */

    const API_KEY = process.env.GOOGLE_API_KEY;
    if (!API_KEY || API_KEY.includes("your") || API_KEY === "MOCK") {
       console.log("Using Mock Data for Interview Evaluation...");
       return res.json({
         overallScore: 85,
         strengths: ["Clear communication", "Structured thinking", "Ethical mindset"],
         areasForImprovement: ["Providing more specific examples", "Pausing before answering"],
         detailedFeedback: qaPairs.map(qa => ({
           question: qa.question,
           feedback: "This is a mock feedback indicating your answer showed good intent but lacked specifics.",
           idealApproach: "The ideal approach is to use the STAR method to provide a structured and evidence-based answer."
         })),
         finalVerdict: `This is a mock verdict. Overall, you performed well for the ${role} position, demonstrating strong potential.`
       });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Act as a strict but constructive UPSC/Exam board interviewer for the role: "${role}".
      Evaluate the candidate's answers to the following questions:
      
      ${JSON.stringify(qaPairs, null, 2)}
      
      Provide a comprehensive JSON report with the following structure:
      {
        "overallScore": 85, // out of 100
        "strengths": ["Strength 1", "Strength 2"],
        "areasForImprovement": ["Area 1", "Area 2"],
        "detailedFeedback": [
           { 
             "question": "The question asked", 
             "feedback": "Feedback on this specific answer",
             "idealApproach": "What the ideal approach to answering this would be"
           }
        ],
        "finalVerdict": "A short summary paragraph of their performance."
      }
    `;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    if (responseText.includes('```json')) {
      responseText = responseText.split('```json')[1].split('```')[0].trim();
    } else if (responseText.includes('```')) {
      responseText = responseText.split('```')[1].split('```')[0].trim();
    }
    
    res.json(JSON.parse(responseText));
  } catch (error) {
    console.error("Error evaluating interview:", error);
    res.status(500).json({ error: error.message || "Failed to evaluate interview." });
  }
};
