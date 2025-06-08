import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Removed unused imports
import { CheckCircle, XCircle, AlertCircle, Trophy, RefreshCw } from "lucide-react";

// Define quiz question type
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

// Quiz data
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What does the 'DOM' stand for in web development?",
    options: [
      "Data Object Model",
      "Document Object Model",
      "Digital Object Model",
      "Document Oriented Model"
    ],
    correctAnswer: 1,
    explanation: "The DOM (Document Object Model) is a programming interface for web documents that represents the page so programs can change the structure, style, and content.",
    category: "Web Development"
  },
  {
    id: 2,
    question: "In React, what hook is used to perform side effects?",
    options: [
      "useState",
      "useReducer",
      "useEffect",
      "useContext"
    ],
    correctAnswer: 2,
    explanation: "useEffect is the React hook used for performing side effects in functional components, like data fetching, subscriptions, or manually changing the DOM.",
    category: "React"
  },
  {
    id: 3,
    question: "What is the main purpose of TypeScript?",
    options: [
      "To replace JavaScript completely",
      "To add static typing to JavaScript",
      "To create server-side applications only",
      "To optimize JavaScript runtime performance"
    ],
    correctAnswer: 1,
    explanation: "TypeScript adds static typing to JavaScript, allowing developers to define types for variables, function parameters, and return values, which can help catch errors during development.",
    category: "TypeScript"
  },
  {
    id: 4,
    question: "Which of these is NOT a feature of Java?",
    options: [
      "Platform independence",
      "Automatic memory management",
      "Multiple inheritance of classes",
      "Object-oriented programming"
    ],
    correctAnswer: 2,
    explanation: "Java does not support multiple inheritance of classes to avoid the 'diamond problem'. It uses interfaces to achieve similar functionality.",
    category: "Java"
  },
  {
    id: 5,
    question: "What is the difference between '==' and '===' in JavaScript?",
    options: [
      "There is no difference",
      "'==' checks value only, '===' checks value and type",
      "'===' checks value only, '==' checks value and type",
      "'==' is for strings, '===' is for numbers"
    ],
    correctAnswer: 1,
    explanation: "The '==' operator performs type coercion before comparing values, while '===' compares both value and type without type coercion.",
    category: "JavaScript"
  },
  {
    id: 6,
    question: "What MySQL command is used to retrieve data from a database?",
    options: [
      "GET",
      "FIND",
      "SELECT",
      "EXTRACT"
    ],
    correctAnswer: 2,
    explanation: "The SELECT statement is used in MySQL to retrieve data from a database. It's one of the fundamental SQL commands.",
    category: "Databases"
  },
  {
    id: 7,
    question: "Which CSS property is used to create space between elements' content and their borders?",
    options: [
      "margin",
      "padding",
      "spacing",
      "gap"
    ],
    correctAnswer: 1,
    explanation: "Padding in CSS is used to create space between an element's content and its border. Margin creates space outside the border, between elements.",
    category: "CSS"
  },
  {
    id: 8,
    question: "In Python, what is the correct way to define a function?",
    options: [
      "function myFunc():",
      "def myFunc():",
      "create myFunc():",
      "func myFunc():"
    ],
    correctAnswer: 1,
    explanation: "In Python, functions are defined using the 'def' keyword followed by the function name and parentheses.",
    category: "Python"
  }
];

export default function TechQuizSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // State for quiz
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  
  // Function to shuffle array
  const shuffleArray = (array: QuizQuestion[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 5); // Only take 5 questions for the quiz
  };
  
  // Start the quiz
  const startQuiz = () => {
    setShuffledQuestions(shuffleArray(quizQuestions));
    setCurrentQuestion(0);
    setScore(0);
    setQuizStarted(true);
    setQuizCompleted(false);
  };
  
  // Handle option selection
  const handleOptionSelect = (optionIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(optionIndex);
    setAnswered(true);
    
    // Check if answer is correct
    if (optionIndex === shuffledQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setResult("correct");
    } else {
      setResult("incorrect");
    }
    
    setShowExplanation(true);
  };
  
  // Go to next question
  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setAnswered(false);
    setShowExplanation(false);
    setResult(null);
    
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };
  
  // Restart the quiz
  const restartQuiz = () => {
    startQuiz();
  };
  
  return (
    <section id="tech-quiz" ref={ref} className="py-16 md:py-24 bg-neutral-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-extrabold text-secondary mb-4 text-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Test Your Tech Knowledge
          </motion.h2>
          <motion.div 
            className="w-16 h-1 bg-primary mx-auto mb-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.p 
            className="text-lg text-neutral-dark max-w-3xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Try this quick quiz to test your knowledge of programming and web development concepts.
          </motion.p>
        </div>
        
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-primary/20">
            <CardContent className="p-8 bg-white">
              {!quizStarted ? (
                <div className="text-center">
                  <motion.div 
                    className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-6 flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                      transition: { duration: 0.3 } 
                    }}
                  >
                    <AlertCircle className="w-12 h-12 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-secondary mb-4">Ready to Test Your Knowledge?</h3>
                  <p className="text-neutral-dark mb-6">
                    This quiz contains 5 random questions about programming and web development. 
                    See how many you can answer correctly!
                  </p>
                  <Button 
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold px-6 py-6"
                    onClick={startQuiz}
                  >
                    Start Quiz
                  </Button>
                </div>
              ) : quizCompleted ? (
                <div className="text-center">
                  <motion.div 
                    className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-6 flex items-center justify-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      rotate: [0, 10, 0, -10, 0],
                    }}
                    transition={{ duration: 1 }}
                  >
                    <Trophy className="w-12 h-12 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-secondary mb-4">Quiz Completed!</h3>
                  <p className="text-neutral-dark mb-2">
                    You scored:
                  </p>
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
                    {score} / {shuffledQuestions.length}
                  </div>
                  <p className="text-neutral-dark mb-6">
                    {score === shuffledQuestions.length 
                      ? "Perfect score! You're a tech genius!" 
                      : score >= shuffledQuestions.length / 2 
                        ? "Good job! You know your stuff!"
                        : "Keep learning! Practice makes perfect!"}
                  </p>
                  <Button 
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold px-6 py-2"
                    onClick={restartQuiz}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Badge className="bg-primary/10 text-primary py-1 px-3 text-sm">
                      Question {currentQuestion + 1} of {shuffledQuestions.length}
                    </Badge>
                    <Badge className="bg-primary/10 text-primary py-1 px-3 text-sm">
                      Score: {score}
                    </Badge>
                  </div>
                  <Badge className="mb-4 bg-secondary/10 text-secondary py-1 px-3 text-sm">
                    {shuffledQuestions[currentQuestion].category}
                  </Badge>
                  <h3 className="text-xl font-bold text-secondary mb-6">
                    {shuffledQuestions[currentQuestion].question}
                  </h3>
                  <div className="space-y-3 mb-6">
                    {shuffledQuestions[currentQuestion].options.map((option, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: answered ? 1 : 1.02, x: answered ? 0 : 5 }}
                        onClick={() => handleOptionSelect(index)}
                      >
                        <div 
                          className={`p-4 rounded-lg cursor-pointer border transition-all ${
                            selectedAnswer === index 
                              ? result === "correct"
                                ? "border-green-500 bg-green-50"
                                : "border-red-500 bg-red-50"
                              : shuffledQuestions[currentQuestion].correctAnswer === index && answered
                                ? "border-green-500 bg-green-50"
                                : "border-gray-200 hover:border-primary hover:bg-primary/5"
                          } ${answered && selectedAnswer !== index && index !== shuffledQuestions[currentQuestion].correctAnswer ? "opacity-50" : ""}`}
                        >
                          <div className="flex items-center">
                            <div className="mr-3 flex-shrink-0">
                              {answered && (
                                selectedAnswer === index 
                                  ? result === "correct"
                                    ? <CheckCircle className="h-5 w-5 text-green-500" />
                                    : <XCircle className="h-5 w-5 text-red-500" />
                                  : shuffledQuestions[currentQuestion].correctAnswer === index
                                    ? <CheckCircle className="h-5 w-5 text-green-500" />
                                    : null
                              )}
                            </div>
                            <div className="flex-grow">
                              {option}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <AnimatePresence>
                    {showExplanation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`p-4 rounded-lg mb-6 ${
                          result === "correct" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                        }`}
                      >
                        <p className="text-neutral-dark">
                          <span className="font-bold">
                            {result === "correct" ? "Correct! " : "Incorrect. "}
                          </span>
                          {shuffledQuestions[currentQuestion].explanation}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="text-center">
                    {answered && (
                      <Button 
                        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold"
                        onClick={handleNextQuestion}
                      >
                        {currentQuestion < shuffledQuestions.length - 1 ? "Next Question" : "View Results"}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}