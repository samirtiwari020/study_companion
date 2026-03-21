import mongoose from "mongoose";

export const isDBConnected = () => {
  return mongoose.connection.readyState === 1;
};

export const mockUsers = new Map([
  ["demo@example.com", {
    _id: "demo-user-1",
    name: "Demo User",
    email: "demo@example.com",
    password: "hashed_password",
    points: 150
  }]
]);

export const mockStudyPlans = new Map([
  ["demo-plan-1", {
    _id: "demo-plan-1",
    user: "demo-user-1",
    title: "JEE Advanced Prep",
    strategy: "Focus on weak topics first, daily 2-3 hour sessions",
    topics: [
      { name: "Calculus", hoursPerWeek: 3 },
      { name: "Vectors", hoursPerWeek: 2 }
    ]
  }]
]);

export const mockPracticeQuestions = new Map([
  ["q1", {
    _id: "q1",
    user: "demo-user-1",
    topic: "Calculus",
    question: "What is the derivative of x²?",
    options: ["x", "2x", "x²", "2"],
    correctAnswerIndex: 1
  }]
]);
