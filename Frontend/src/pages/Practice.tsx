import { motion, type Variants, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  Lightbulb,
  Atom,
  Brain,
  Calculator,
  Stethoscope,
  Trophy,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp: Variants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const topics = [
  { name: "Physics", icon: Atom, color: "from-blue-500 to-indigo-600", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { name: "Chemistry", icon: Brain, color: "from-emerald-500 to-teal-600", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { name: "Mathematics", icon: Calculator, color: "from-amber-500 to-orange-600", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  { name: "Biology", icon: Stethoscope, color: "from-pink-500 to-rose-600", bg: "bg-pink-500/10", border: "border-pink-500/20" },
];

const difficulties = [
  { name: "Easy", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { name: "Medium", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  { name: "Hard", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
];

const questions = [
  {
    question: "A body is thrown vertically upward with velocity u. The ratio of times at which it is at a particular height h is:",
    options: [
      "1 : 1",
      "u − √(u² − 2gh) : u + √(u² − 2gh)",
      "(u + √(u² − 2gh)) / 2g",
      "None of these",
    ],
    correct: 1,
    explanation:
      "When a body is thrown vertically upward, it passes through any height h twice — once going up and once coming down. Using h = ut − ½gt², we get a quadratic in t, giving two values whose ratio is u − √(u² − 2gh) : u + √(u² − 2gh).",
    topic: "Kinematics",
  },
  {
    question: "The hybridization of carbon in methane (CH₄) is:",
    options: ["sp", "sp²", "sp³", "sp³d"],
    correct: 2,
    explanation:
      "In methane, carbon forms 4 equivalent C–H bonds. It uses one 2s and three 2p orbitals to form four sp³ hybrid orbitals arranged tetrahedrally, giving bond angles of 109.5°.",
    topic: "Chemical Bonding",
  },
  {
    question: "The derivative of sin(x²) with respect to x is:",
    options: ["cos(x²)", "2x·cos(x²)", "x²·cos(x²)", "2·sin(x)·cos(x)"],
    correct: 1,
    explanation:
      "Using the chain rule: d/dx[sin(x²)] = cos(x²) · d/dx(x²) = cos(x²) · 2x = 2x·cos(x²). Always apply the chain rule when differentiating composite functions.",
    topic: "Calculus",
  },
  {
    question: "Which organelle is known as the 'powerhouse of the cell'?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Apparatus"],
    correct: 2,
    explanation:
      "Mitochondria are called the 'powerhouse of the cell' because they produce ATP through oxidative phosphorylation. ATP is the primary energy currency of the cell, fueling metabolic processes.",
    topic: "Cell Biology",
  },
  {
    question: "Newton's third law of motion states that:",
    options: [
      "Every body remains at rest unless acted upon",
      "F = ma",
      "For every action, there is an equal and opposite reaction",
      "Energy can neither be created nor destroyed",
    ],
    correct: 2,
    explanation:
      "Newton's third law states that when object A exerts a force on object B, object B simultaneously exerts an equal and opposite force on object A. These forces act on different bodies and are called action-reaction pairs.",
    topic: "Laws of Motion",
  },
];

export default function Practice() {
  const [stage, setStage] = useState<"select" | "quiz" | "result">("select");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const q = questions[currentQ];
  const isCorrect = selectedOption === q.correct;
  const progress = ((currentQ + (answered ? 1 : 0)) / questions.length) * 100;

  const startQuiz = () => {
    if (selectedTopic && selectedDifficulty) {
      setStage("quiz");
      setCurrentQ(0);
      setScore(0);
      setSelectedOption(null);
      setAnswered(false);
    }
  };

  const submitAnswer = () => {
    if (selectedOption === null) return;
    setAnswered(true);
    if (selectedOption === q.correct) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((i) => i + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setStage("result");
    }
  };

  const resetQuiz = () => {
    setStage("select");
    setSelectedOption(null);
    setAnswered(false);
    setCurrentQ(0);
    setScore(0);
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/20">
          <BookOpen className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Practice</h1>
          <p className="text-xs text-muted-foreground">
            Test your knowledge with adaptive questions
          </p>
        </div>
      </motion.div>

      {/* ─── STAGE: SELECT ─── */}
      <AnimatePresence mode="wait">
        {stage === "select" && (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-5"
          >
            {/* Topic */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" /> Choose a Subject
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {topics.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => setSelectedTopic(t.name)}
                    className={`flex flex-col items-center gap-2.5 p-4 rounded-xl border text-sm font-medium transition-all ${
                      selectedTopic === t.name
                        ? `${t.border} ${t.bg} text-foreground shadow-sm`
                        : "border-border/50 hover:border-border hover:bg-muted/30 text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                        selectedTopic === t.name
                          ? `bg-gradient-to-br ${t.color} text-white shadow-md`
                          : "bg-muted"
                      }`}
                    >
                      <t.icon className="h-5 w-5" />
                    </div>
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="font-semibold text-sm">Select Difficulty</h3>
              <div className="flex gap-3">
                {difficulties.map((d) => (
                  <button
                    key={d.name}
                    onClick={() => setSelectedDifficulty(d.name)}
                    className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all ${
                      selectedDifficulty === d.name
                        ? `${d.border} ${d.bg} ${d.color}`
                        : "border-border/50 text-muted-foreground hover:bg-muted/30"
                    }`}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Start */}
            <Button
              className="gradient-primary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all gap-2 group"
              onClick={startQuiz}
              disabled={!selectedTopic || !selectedDifficulty}
            >
              Start Practice
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}

        {/* ─── STAGE: QUIZ ─── */}
        {stage === "quiz" && (
          <motion.div
            key={`quiz-${currentQ}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Progress and Stats bar */}
            <div className="flex items-center justify-between mb-4 bg-background/50 p-3 rounded-2xl border border-border/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/20 text-white font-bold">
                  {currentQ + 1}<span className="text-white/70 text-xs">/{questions.length}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold">Challenge Progress</h3>
                  <div className="w-32 sm:w-48 h-2.5 rounded-full bg-muted mt-1.5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full gradient-primary"
                      initial={{ width: `${(currentQ / questions.length) * 100}%` }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, type: "spring" }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Score Streak</span>
                <span className="text-sm font-bold flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                  {score} <Trophy className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>

            {/* Question card */}
            <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 border border-primary/10 relative overflow-hidden">
              {/* Decorative blur */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              {/* Topic tag */}
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="h-3 w-3" /> {q.topic}
              </span>

              {/* Question */}
              <p className="font-bold text-xl leading-relaxed text-foreground">{q.question}</p>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {q.options.map((opt, i) => {
                  let style = "border-border/60 hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.01]";
                  let iconBg = "bg-muted text-muted-foreground";
                  let animation = {};
                  
                  if (answered) {
                    if (i === q.correct) {
                      style = "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] scale-[1.02] z-10";
                      iconBg = "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/30";
                      animation = { scale: [1, 1.1, 1], transition: { duration: 0.4 } };
                    } else if (i === selectedOption) {
                      style = "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.15)] opacity-90";
                      iconBg = "bg-gradient-to-br from-red-400 to-red-600 text-white shadow-lg shadow-red-500/30";
                      animation = { x: [-5, 5, -5, 5, 0], transition: { duration: 0.4 } };
                    } else {
                      style = "border-border/30 opacity-40 scale-95";
                    }
                  } else if (selectedOption === i) {
                    style = "border-primary bg-primary/10 shadow-md shadow-primary/20 scale-[1.02]";
                    iconBg = "gradient-primary text-white shadow-md shadow-primary/30";
                  }

                  return (
                    <motion.button
                      key={i}
                      whileTap={!answered ? { scale: 0.98 } : {}}
                      animate={animation}
                      onClick={() => !answered && setSelectedOption(i)}
                      disabled={answered}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 ${style}`}
                    >
                      <motion.span
                        className={`h-10 w-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-colors duration-300 ${iconBg}`}
                      >
                        {answered && i === q.correct ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : answered && i === selectedOption ? (
                          <XCircle className="h-5 w-5" />
                        ) : (
                          String.fromCharCode(65 + i)
                        )}
                      </motion.span>
                      <span className="text-base font-medium">{opt}</span>
                      
                      {/* Success highlight overlay */}
                      {answered && i === q.correct && (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          className="absolute inset-0 rounded-2xl border-2 border-emerald-500/50 pointer-events-none"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation (after submit) */}
              <AnimatePresence>
                {answered && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    className={`rounded-2xl p-6 border-2 overflow-hidden relative shadow-lg ${
                      isCorrect
                        ? "bg-emerald-500/5 border-emerald-500/30 shadow-emerald-500/10"
                        : "bg-red-500/5 border-red-500/30 shadow-red-500/10"
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-current opacity-[0.03] blur-2xl rounded-full" />
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-xl ${isCorrect ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                        {isCorrect ? (
                          <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-500" />
                        )}
                      </div>
                      <div>
                        <h4 className={`font-black text-lg ${isCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                          {isCorrect ? "Awesome! +10 XP 🎉" : "Not quite right"}
                        </h4>
                        {!isCorrect && (
                          <p className="text-sm font-medium mt-0.5">
                            Correct Answer: <span className="text-foreground">{String.fromCharCode(65 + q.correct)}. {q.options[q.correct]}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 bg-background/50 p-4 rounded-xl border border-border/50">
                      <div className="p-1.5 rounded-lg bg-amber-500/20 shrink-0">
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                      </div>
                      <p className="text-sm font-medium leading-relaxed">{q.explanation}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="pt-2">
                {!answered ? (
                  <Button
                    className="w-full h-12 rounded-xl text-base font-bold gradient-primary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all btn-lift"
                    onClick={submitAnswer}
                    disabled={selectedOption === null}
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button
                    className="w-full h-12 rounded-xl text-base font-bold gradient-primary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all gap-2 group btn-lift"
                    onClick={nextQuestion}
                  >
                    {currentQ < questions.length - 1 ? "Next Challenge" : "See Final Score"}
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── STAGE: RESULT ─── */}
        {stage === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-5"
          >
            <div className="glass-card rounded-2xl p-8 text-center space-y-5 border border-primary/10">
              <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto shadow-xl shadow-primary/25">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Practice Complete! 🎉</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  {selectedTopic} · {selectedDifficulty}
                </p>
              </div>

              {/* Score ring */}
              <div className="inline-flex flex-col items-center justify-center p-6">
                <div className="text-5xl font-extrabold gradient-text">
                  {score}/{questions.length}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {score === questions.length
                    ? "Perfect score! You're a genius! 🧠"
                    : score >= questions.length * 0.6
                    ? "Great job! Keep practicing! 💪"
                    : "Keep going, you'll get there! 📚"}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-2xl font-bold text-emerald-500">{score}</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-medium mt-1">Correct</p>
                </div>
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-2xl font-bold text-red-500">{questions.length - score}</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-medium mt-1">Incorrect</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <p className="text-2xl font-bold text-blue-500">{Math.round((score / questions.length) * 100)}%</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-medium mt-1">Accuracy</p>
                </div>
              </div>

              <div className="flex gap-3 justify-center pt-2">
                <Button
                  className="gradient-primary text-white shadow-lg shadow-primary/25 gap-2 group"
                  onClick={() => {
                    setCurrentQ(0);
                    setScore(0);
                    setSelectedOption(null);
                    setAnswered(false);
                    setStage("quiz");
                  }}
                >
                  <RotateCcw className="h-4 w-4" /> Retry
                </Button>
                <Button variant="outline" onClick={resetQuiz} className="gap-2">
                  Change Topic
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
