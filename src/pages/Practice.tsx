import { motion, type Variants } from "framer-motion";
import { useState } from "react";
import { BookOpen, Clock, CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp: Variants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const topics = ["Physics", "Chemistry", "Mathematics", "Biology"];
const difficulties = ["Easy", "Medium", "Hard"];

const sampleQuestion = {
  question: "A body is thrown vertically upward with velocity u. The ratio of times at which it is at a particular height h is:",
  options: ["1:1", "u - √(u² - 2gh) : u + √(u² - 2gh)", "(u + √(u² - 2gh)) / 2g", "None of these"],
  correct: 1,
  explanation: "When a body is thrown vertically upward, it passes through any height h twice - once going up and once coming down. Using h = ut - ½gt², we get a quadratic in t, giving the ratio as u - √(u² - 2gh) : u + √(u² - 2gh).",
};

export default function Practice() {
  const [stage, setStage] = useState<"select" | "quiz" | "result">("select");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft] = useState(30);

  const startQuiz = () => {
    if (selectedTopic && selectedDifficulty) setStage("quiz");
  };

  const submitAnswer = () => {
    if (selectedOption !== null) setStage("result");
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 max-w-3xl mx-auto">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold">Practice</h1>
        <p className="text-muted-foreground text-sm mt-1">Test your knowledge with AI-generated questions</p>
      </motion.div>

      {stage === "select" && (
        <>
          <motion.div variants={fadeUp} className="glass-card p-5 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" /> Select Topic
            </h3>
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTopic(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedTopic === t ? "gradient-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="glass-card p-5 space-y-4">
            <h3 className="font-semibold">Select Difficulty</h3>
            <div className="flex gap-2">
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficulty(d)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedDifficulty === d ? "gradient-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Button variant="gradient" onClick={startQuiz} disabled={!selectedTopic || !selectedDifficulty} className="gap-2">
              Start Practice <ChevronRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </>
      )}

      {stage === "quiz" && (
        <motion.div variants={fadeUp} className="glass-card p-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">{selectedTopic} · {selectedDifficulty}</span>
            <div className="flex items-center gap-1 text-sm font-medium text-warning">
              <Clock className="h-4 w-4" /> {timeLeft}s
            </div>
          </div>

          <p className="font-medium text-lg leading-relaxed">{sampleQuestion.question}</p>

          <div className="space-y-3">
            {sampleQuestion.options.map((opt, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedOption(i)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedOption === i
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <span className="text-sm font-medium mr-3 text-muted-foreground">{String.fromCharCode(65 + i)}.</span>
                <span className="text-sm">{opt}</span>
              </motion.button>
            ))}
          </div>

          <Button variant="gradient" onClick={submitAnswer} disabled={selectedOption === null} className="w-full">
            Submit Answer
          </Button>
        </motion.div>
      )}

      {stage === "result" && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-6 space-y-5">
          <div className="flex items-center gap-3">
            {selectedOption === sampleQuestion.correct ? (
              <CheckCircle2 className="h-8 w-8 text-success" />
            ) : (
              <XCircle className="h-8 w-8 text-destructive" />
            )}
            <div>
              <h3 className="font-bold text-lg">
                {selectedOption === sampleQuestion.correct ? "Correct! 🎉" : "Incorrect"}
              </h3>
              <p className="text-sm text-muted-foreground">
                The answer is: {String.fromCharCode(65 + sampleQuestion.correct)}. {sampleQuestion.options[sampleQuestion.correct]}
              </p>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium text-sm mb-2">Explanation</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{sampleQuestion.explanation}</p>
          </div>

          <div className="flex gap-3">
            <Button variant="gradient" onClick={() => { setStage("quiz"); setSelectedOption(null); }}>
              Next Question
            </Button>
            <Button variant="outline" onClick={() => { setStage("select"); setSelectedOption(null); }}>
              Change Topic
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
