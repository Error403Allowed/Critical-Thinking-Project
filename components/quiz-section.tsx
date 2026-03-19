"use client"

import { useEffect, useRef, useState } from "react"
import { 
  FileQuestion,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Star,
  Award,
  Target
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the key difference between misinformation and disinformation?",
    options: [
      "There is no difference",
      "Disinformation is spread intentionally, misinformation is spread without intent to deceive",
      "Misinformation is more harmful",
      "Disinformation only appears on social media"
    ],
    correctAnswer: 1,
    explanation: "Disinformation is deliberately created and spread to deceive, while misinformation is false information shared by people who believe it to be true.",
    category: "Definitions"
  },
  {
    id: 2,
    question: "What does the 'S' stand for in the SIFT method?",
    options: [
      "Search",
      "Stop",
      "Source",
      "Share"
    ],
    correctAnswer: 1,
    explanation: "The 'S' stands for STOP - reminding you to pause before reacting to or sharing information, especially if it triggers strong emotions.",
    category: "Techniques"
  },
  {
    id: 3,
    question: "Which of these is a red flag that content might be misinformation?",
    options: [
      "The article includes citations and sources",
      "The headline uses emotional language and ALL CAPS",
      "The author's credentials are clearly stated",
      "The content appears on multiple reputable news sites"
    ],
    correctAnswer: 1,
    explanation: "Headlines with emotional language, ALL CAPS, and sensationalism are common tactics used by misinformation to get clicks and shares.",
    category: "Red Flags"
  },
  {
    id: 4,
    question: "What is 'lateral reading'?",
    options: [
      "Reading multiple books at the same time",
      "Skimming articles quickly from left to right",
      "Opening new tabs to check what others say about a source",
      "Reading only the headlines of articles"
    ],
    correctAnswer: 2,
    explanation: "Lateral reading means leaving a website to open new tabs and verify information about the source by checking what experts and fact-checkers say about it.",
    category: "Techniques"
  },
  {
    id: 5,
    question: "Why does misinformation spread faster than accurate information?",
    options: [
      "It's usually shorter and easier to read",
      "Social media algorithms prefer false content",
      "It often triggers stronger emotional responses",
      "Accurate information requires subscriptions"
    ],
    correctAnswer: 2,
    explanation: "Research shows that content triggering strong emotions (fear, outrage, surprise) gets shared more often, regardless of accuracy.",
    category: "Psychology"
  },
  {
    id: 6,
    question: "What is confirmation bias?",
    options: [
      "Asking for confirmation before sharing content",
      "The tendency to believe information that matches our existing views",
      "Confirming facts with multiple sources",
      "A type of computer virus"
    ],
    correctAnswer: 1,
    explanation: "Confirmation bias makes us more likely to accept and share information that confirms what we already believe, while dismissing contradicting evidence.",
    category: "Psychology"
  },
  {
    id: 7,
    question: "Which source would be most reliable for verifying a scientific claim?",
    options: [
      "A viral social media post with millions of shares",
      "A peer-reviewed journal article",
      "A celebrity endorsement",
      "A website selling related products"
    ],
    correctAnswer: 1,
    explanation: "Peer-reviewed journals involve expert review before publication, making them among the most reliable sources for scientific claims.",
    category: "Sources"
  },
  {
    id: 8,
    question: "What should you do if you discover you've shared misinformation?",
    options: [
      "Delete the post and hope no one noticed",
      "Ignore it since it's already done",
      "Post a correction and inform those who may have seen it",
      "Blame the original source"
    ],
    correctAnswer: 2,
    explanation: "Taking responsibility by posting a correction helps stop the spread and demonstrates critical thinking. It's okay to make mistakes - what matters is how we respond.",
    category: "Best Practices"
  },
  {
    id: 9,
    question: "What does the 'C' in the CRAAP test evaluate?",
    options: [
      "Clickbait",
      "Conspiracy",
      "Currency (timeliness)",
      "Confirmation"
    ],
    correctAnswer: 2,
    explanation: "Currency refers to when the information was published and whether it's still timely and relevant for your needs.",
    category: "Techniques"
  },
  {
    id: 10,
    question: "Which statement about fact-checking websites is TRUE?",
    options: [
      "They are always 100% accurate",
      "They can be useful but should be one of multiple verification methods",
      "They are run by governments to control information",
      "They only check political content"
    ],
    correctAnswer: 1,
    explanation: "Fact-checking sites are valuable tools, but no single source is perfect. Use them as part of a broader verification strategy with multiple sources.",
    category: "Sources"
  },
]

export function QuizSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)
  const [answers, setAnswers] = useState<(boolean | null)[]>(new Array(quizQuestions.length).fill(null))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleAnswerSelect = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return
    
    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer
    setShowResult(true)
    
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = isCorrect
    setAnswers(newAnswers)
    
    if (isCorrect) {
      setScore(prev => prev + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizComplete(true)
    }
  }

  const resetQuiz = () => {
    setQuizStarted(false)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizComplete(false)
    setAnswers(new Array(quizQuestions.length).fill(null))
  }

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100
    if (percentage >= 90) return { icon: Trophy, text: "Outstanding! You're a fact-checking expert!", color: "text-primary" }
    if (percentage >= 70) return { icon: Award, text: "Great job! You have strong critical thinking skills.", color: "text-accent" }
    if (percentage >= 50) return { icon: Star, text: "Good effort! Review the techniques section to improve.", color: "text-warning" }
    return { icon: Target, text: "Keep learning! Check out our learning materials above.", color: "text-muted-foreground" }
  }

  const question = quizQuestions[currentQuestion]

  return (
    <section
      ref={sectionRef}
      id="quiz"
      className="py-24 relative"
      aria-labelledby="quiz-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <FileQuestion className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-sm text-muted-foreground">Test Your Knowledge</span>
          </div>
          <h2 id="quiz-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            Knowledge <span className="text-gradient">Quiz</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Put your critical thinking skills to the test with this comprehensive quiz 
            covering everything you&apos;ve learned about debunking misinformation.
          </p>
        </div>

        {/* Quiz Container */}
        <div className={`glass rounded-3xl p-6 md:p-10 max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          
          {/* Quiz Start Screen */}
          {!quizStarted && !quizComplete && (
            <div className="text-center py-10">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                <FileQuestion className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to Test Your Skills?</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                This quiz contains {quizQuestions.length} questions covering key concepts 
                in identifying and debunking misinformation.
              </p>
              <ul className="text-left max-w-sm mx-auto mb-8 space-y-2">
                {["Definitions & concepts", "Fact-checking techniques", "Source evaluation", "Critical thinking psychology"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                onClick={() => setQuizStarted(true)}
                className="glass hover:bg-primary/20 border-primary/30 text-foreground"
              >
                Start Quiz <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Quiz Questions */}
          {quizStarted && !quizComplete && (
            <div className="space-y-6">
              {/* Progress */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
                <span className="glass px-3 py-1 rounded-full text-sm text-foreground">
                  {question.category}
                </span>
              </div>
              <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-2" />

              {/* Question */}
              <div className="glass-strong rounded-2xl p-6 mt-6">
                <h3 className="text-lg md:text-xl font-medium text-foreground">{question.question}</h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index
                  const isCorrect = index === question.correctAnswer
                  const showCorrectness = showResult

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showResult}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center gap-3 ${
                        showCorrectness
                          ? isCorrect
                            ? "bg-success/20 border-2 border-success/50"
                            : isSelected
                              ? "bg-destructive/20 border-2 border-destructive/50"
                              : "glass opacity-50"
                          : isSelected
                            ? "glass border-2 border-primary/50"
                            : "glass hover:bg-secondary/30"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
                        showCorrectness
                          ? isCorrect
                            ? "bg-success/30 text-success"
                            : isSelected
                              ? "bg-destructive/30 text-destructive"
                              : "bg-secondary text-muted-foreground"
                          : isSelected
                            ? "bg-primary/30 text-primary"
                            : "bg-secondary text-muted-foreground"
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-foreground flex-1">{option}</span>
                      {showCorrectness && isCorrect && <CheckCircle2 className="w-5 h-5 text-success shrink-0" />}
                      {showCorrectness && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive shrink-0" />}
                    </button>
                  )
                })}
              </div>

              {/* Explanation */}
              {showResult && (
                <div className={`p-4 rounded-xl ${
                  selectedAnswer === question.correctAnswer
                    ? "bg-success/10 border border-success/20"
                    : "bg-primary/10 border border-primary/20"
                }`}>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Explanation:</span> {question.explanation}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-center gap-4 pt-4">
                {!showResult ? (
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="glass hover:bg-primary/20 border-primary/30 text-foreground"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    className="glass hover:bg-primary/20 border-primary/30 text-foreground"
                  >
                    {currentQuestion < quizQuestions.length - 1 ? (
                      <>Next Question <ArrowRight className="w-4 h-4 ml-2" /></>
                    ) : (
                      <>See Results <Trophy className="w-4 h-4 ml-2" /></>
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Quiz Complete */}
          {quizComplete && (
            <div className="text-center py-10">
              {(() => {
                const scoreInfo = getScoreMessage()
                const Icon = scoreInfo.icon
                return (
                  <>
                    <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center ${scoreInfo.color}`}>
                      <Icon className="w-12 h-12" />
                    </div>
                    <h3 className="text-3xl font-bold mb-2 text-foreground">Quiz Complete!</h3>
                    <p className="text-5xl font-bold text-primary mb-4">{score}/{quizQuestions.length}</p>
                    <p className={`text-lg mb-8 ${scoreInfo.color}`}>{scoreInfo.text}</p>
                    
                    {/* Answer Summary */}
                    <div className="flex justify-center gap-2 mb-8 flex-wrap">
                      {answers.map((correct, i) => (
                        <div
                          key={i}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                            correct === true
                              ? "bg-success/30 text-success"
                              : correct === false
                                ? "bg-destructive/30 text-destructive"
                                : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>

                    <Button
                      size="lg"
                      onClick={resetQuiz}
                      className="glass hover:bg-primary/20 border-primary/30 text-foreground"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" /> Retake Quiz
                    </Button>
                  </>
                )
              })()}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
