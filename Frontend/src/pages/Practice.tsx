import { motion, type Variants, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { BookOpen, Clock, CheckCircle2, XCircle, ChevronRight, Loader2, Lightbulb, Trophy, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp: Variants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const topics = ["Physics", "Chemistry", "Mathematics", "Biology", "History", "Economy", "Polity"];
const difficulties = ["Easy", "Medium", "Hard"];

interface QuestionData {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  hint1: string;
  hint2: string;
  solution: string;
}

interface QuestionResult {
  questionData: QuestionData;
  selectedOption: number | null;
  usedHint: boolean;
  marksEarned: number;
}

export default function Practice() {
  const [stage, setStage] = useState<"select" | "quiz" | "evaluation">("select");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  
  // Quiz State
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  // Scoring & Hints Status
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [results, setResults] = useState<QuestionResult[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (stage === "quiz" && !loading && questions.length > 0) {
      timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [stage, loading, questions]);

  const fetchQuestions = async () => {
    setLoading(true);
    setStage("quiz");
    setCurrentQIndex(0);
    setResults([]);
    setErrorMsg("");
    setQuestions([]);
    
    try {
      const res = await fetch("http://localhost:5000/api/generate-practice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: selectedTopic, difficulty: selectedDifficulty })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate");
      }
      
      if (Array.isArray(data)) {
        setQuestions(data);
      } else {
         throw new Error("Invalid format received from AI.");
      }
      
      setTimeElapsed(0);
      setRevealedHints(0);
      setSelectedOption(null);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message);
      setStage("select");
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = () => {
    if (selectedTopic && selectedDifficulty) {
      fetchQuestions();
    }
  };

  const submitAnswer = () => {
    if (selectedOption !== null) {
      const currQ = questions[currentQIndex];
      const usedHint = revealedHints > 0;
      const isCorrect = selectedOption === currQ.correctAnswerIndex;
      
      // Scoring Logic: 4 marks if correct & no hints. 0 marks otherwise.
      const marks = (isCorrect && !usedHint) ? 4 : 0;
      
      const res: QuestionResult = {
        questionData: currQ,
        selectedOption,
        usedHint,
        marksEarned: marks
      };
      
      setResults(prev => [...prev, res]);
      
      if (currentQIndex < questions.length - 1) {
         setCurrentQIndex(prev => prev + 1);
         setSelectedOption(null);
         setRevealedHints(0);
         setTimeElapsed(0);
      } else {
         setStage("evaluation");
      }
    }
  };

  const revealNextHint = () => {
    if (revealedHints < 2) {
      setRevealedHints(prev => prev + 1);
    }
  };

  // Calculations for final evaluation
  const totalMarks = results.reduce((acc, r) => acc + r.marksEarned, 0);
  const maxPossibleMarks = questions.length * 4;
  const questionsWithHints = results.filter(r => r.usedHint).length;
  const correctWithoutHints = results.filter(r => r.marksEarned === 4).length;
  const correctWithHints = results.filter(r => r.usedHint && r.selectedOption === r.questionData.correctAnswerIndex).length;
  const incorrect = results.filter(r => r.selectedOption !== r.questionData.correctAnswerIndex).length;

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 max-w-4xl mx-auto">
      <motion.div variants={fadeUp}>
        <h1 className="text-3xl font-bold flex items-center gap-2">Practice Challenge</h1>
        <p className="text-muted-foreground text-sm mt-1">Answer without hints for +4 Marks. Using a hint yields 0 marks. Can you score perfect?</p>
      </motion.div>

      {errorMsg && (
         <div className="bg-destructive/10 text-destructive p-3 rounded-lg flex items-center gap-2 text-sm border border-destructive/20">
            <AlertCircle className="w-4 h-4"/> {errorMsg}. Tip: Check if your Gemini API key in the backend .env is valid!
         </div>
      )}

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
                    selectedTopic === t ? "gradient-primary text-primary-foreground shadow-sm" : "bg-muted hover:bg-muted/80"
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
                    selectedDifficulty === d ? "gradient-primary text-primary-foreground shadow-sm" : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Button variant="gradient" onClick={startQuiz} disabled={!selectedTopic || !selectedDifficulty || loading} className="gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : null} 
              {loading ? "Generating Set..." : "Start Practice"} <ChevronRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </>
      )}

      {stage === "quiz" && questions.length > 0 && (
        <motion.div variants={fadeUp} className="glass-card p-6 space-y-6 relative">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
               <span className="text-xs font-bold px-3 py-1 bg-primary/20 text-primary rounded-full uppercase tracking-widest mr-2">Q {currentQIndex + 1} / {questions.length}</span>
               <span className="text-xs font-medium text-muted-foreground">{selectedTopic} · {selectedDifficulty}</span>
            </div>
            <div className="flex items-center gap-1 text-sm font-bold text-warning bg-warning/10 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4" /> {timeElapsed}s
            </div>
          </div>

          <p className="font-medium text-lg leading-relaxed">{questions[currentQIndex].question}</p>

          <div className="space-y-3">
            {questions[currentQIndex].options.map((opt, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedOption(i)}
                className={`w-full flex text-left p-4 rounded-xl border-2 transition-all ${
                  selectedOption === i
                    ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(var(--primary),0.15)]"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <span className="text-sm font-bold mr-3 text-muted-foreground">{String.fromCharCode(65 + i)}.</span>
                <span className="text-sm flex-1">{opt}</span>
              </motion.button>
            ))}
          </div>

          <div className="pt-4 border-t border-border flex flex-col gap-3">
             <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold flex items-center gap-1"><Lightbulb className="w-4 h-4 text-yellow-500" /> Socratic Hints</h4>
                <span className="text-xs font-bold text-destructive">Using hints forfeits the 4 marks!</span>
             </div>
             
             {/* Hint 1 */}
             <div className="bg-muted/30 p-3 rounded-lg flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 border border-border/50">
                <div className="flex-1 text-sm text-muted-foreground">
                  {revealedHints >= 1 ? (
                    <span className="text-foreground">{questions[currentQIndex].hint1}</span>
                  ) : (
                    <span className="italic flex items-center gap-2">
                       <Clock className="w-3 h-3 text-warning"/> Unlocks at 15s
                    </span>
                  )}
                </div>
                {revealedHints === 0 && (
                  <Button size="sm" variant="secondary" onClick={revealNextHint} disabled={timeElapsed < 15}>
                    Reveal Hint 1 (0 Marks)
                  </Button>
                )}
             </div>

             {/* Hint 2 */}
             {revealedHints >= 1 && (
               <motion.div initial={{opacity: 0, y:-10}} animate={{opacity: 1, y:0}} className="bg-muted/30 p-3 rounded-lg flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 border border-border/50">
                  <div className="flex-1 text-sm text-muted-foreground">
                    {revealedHints >= 2 ? (
                      <span className="text-foreground">{questions[currentQIndex].hint2}</span>
                    ) : (
                      <span className="italic flex items-center gap-2">
                        <Clock className="w-3 h-3 text-warning"/> Unlocks at 30s
                      </span>
                    )}
                  </div>
                  {revealedHints === 1 && (
                    <Button size="sm" variant="secondary" onClick={revealNextHint} disabled={timeElapsed < 30}>
                      Reveal final hint
                    </Button>
                  )}
               </motion.div>
             )}
          </div>

          <Button variant="gradient" size="lg" onClick={submitAnswer} disabled={selectedOption === null} className="w-full font-bold text-md tracking-wide mt-4 shadow-lg hover:shadow-primary/25 transition-all">
            {currentQIndex < questions.length - 1 ? "Submit & Next" : "Submit & Evaluate"}
          </Button>
        </motion.div>
      )}

      {stage === "evaluation" && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
           <div className="glass-card p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5"><Trophy className="w-48 h-48"/></div>
              <h2 className="text-3xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent relative z-10">Challenge Complete!</h2>
              <p className="text-muted-foreground mb-8 relative z-10">You've completed the {selectedTopic} practice set.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                 <div className="bg-background rounded-xl p-4 border border-border flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-primary">{totalMarks}</span>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Total Marks</span>
                 </div>
                 <div className="bg-background rounded-xl p-4 border border-border flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-success">{correctWithoutHints}</span>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Perfect Avoids</span>
                 </div>
                 <div className="bg-background rounded-xl p-4 border border-border flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-warning">{questionsWithHints}</span>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Hints Used</span>
                 </div>
                 <div className="bg-background rounded-xl p-4 border border-border flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-destructive">{incorrect}</span>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Incorrect</span>
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <h3 className="text-xl font-bold ml-1">Question Solutions</h3>
              {results.map((r, i) => (
                 <div key={i} className="glass-card p-6 border-l-4" style={{ borderLeftColor: r.marksEarned > 0 ? "hsl(var(--success))" : "hsl(var(--destructive))" }}>
                    <div className="flex justify-between items-start mb-4">
                       <h4 className="font-semibold">{i+1}. {r.questionData.question}</h4>
                       <span className={`px-2 py-1 rounded text-xs font-bold shrink-0 ${r.marksEarned > 0 ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
                          +{r.marksEarned} Marks
                       </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                       <div className="space-y-2">
                          {r.questionData.options.map((opt, optIdx) => (
                             <div key={optIdx} className={`text-sm p-3 rounded-md border ${
                                optIdx === r.questionData.correctAnswerIndex ? 'bg-success/10 border-success/30 font-medium' :
                                optIdx === r.selectedOption ? 'bg-destructive/10 border-destructive/30' : 'bg-muted/30 border-transparent text-muted-foreground'
                             }`}>
                                {String.fromCharCode(65 + optIdx)}. {opt}
                                {optIdx === r.questionData.correctAnswerIndex && <CheckCircle2 className="w-4 h-4 text-success inline float-right"/>}
                                {optIdx === r.selectedOption && optIdx !== r.questionData.correctAnswerIndex && <XCircle className="w-4 h-4 text-destructive inline float-right"/>}
                             </div>
                          ))}
                       </div>
                       <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 flex flex-col">
                          <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-2">
                             <CheckCircle2 className="w-4 h-4"/> Step-by-step Solution
                          </span>
                          <p className="text-sm text-foreground/80 leading-relaxed overflow-y-auto max-h-48 custom-scrollbar pr-2">{r.questionData.solution}</p>
                       </div>
                    </div>
                 </div>
              ))}
           </div>

           <div className="flex justify-center pt-4">
             <Button size="lg" variant="outline" onClick={() => setStage("select")}>Take Another Practice Set</Button>
           </div>
        </motion.div>
      )}
    </motion.div>
  );
}
