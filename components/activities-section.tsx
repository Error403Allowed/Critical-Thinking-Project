"use client"

import { useEffect, useRef, useState } from "react"
import { 
  Gamepad2, 
  CheckCircle2, 
  XCircle, 
  RefreshCw,
  ArrowRight,
  Trophy,
  Lightbulb,
  Shuffle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Analytics } from "@vercel/analytics/next"

// Headline Challenge Data
const headlines = [
  {
    id: 1,
    text: "Scientists Discover New Species of Deep-Sea Fish Near Australia",
    isReal: true,
    explanation: "This is a credible headline. Scientists regularly discover new species, especially in deep-sea environments. The specific location adds credibility."
  },
  {
    id: 2,
    text: "URGENT: Wi-Fi Signals Proven to Cause Cancer in New Study",
    isReal: false,
    explanation: "Red flags: Uses 'URGENT' for emotional impact, makes extreme claims. Major health findings would be reported by reputable outlets, and extensive research has found no link between Wi-Fi and cancer."
  },
  {
    id: 3,
    text: "Local Council Approves New Bike Lane Network for City Centre",
    isReal: true,
    explanation: "This is a typical local news headline - specific, mundane, and about a common civic project. These characteristics suggest credibility."
  },
  {
    id: 4,
    text: "SHOCKING: Celebrities Are Actually Robots Controlled by Government",
    isReal: false,
    explanation: "Red flags: Uses 'SHOCKING' for emotional manipulation, makes extraordinary claims without evidence. This is a common conspiracy theory format."
  },
  {
    id: 5,
    text: "Study Links Regular Exercise to Improved Mental Health Outcomes",
    isReal: true,
    explanation: "This is credible - it's a well-established finding backed by extensive research. The measured language ('links', 'improved') suggests scientific reporting."
  },
  {
    id: 6,
    text: "This One Weird Trick Will Cure All Diseases Doctors Don't Want You to Know",
    isReal: false,
    explanation: "Red flags: 'One weird trick' is classic clickbait, claims of curing 'all diseases' are impossible, and 'doctors don't want you to know' is a conspiracy trope."
  },
  {
    id: 7,
    text: "Reserve Bank Holds Interest Rates Steady at Monthly Meeting",
    isReal: true,
    explanation: "Financial news about central banks is regularly reported. The mundane, specific nature and professional language indicate a legitimate news item."
  },
  {
    id: 8,
    text: "5G Towers Spreading Coronavirus Across Australia, Leaked Documents Show",
    isReal: false,
    explanation: "This is debunked misinformation. COVID-19 is a virus spread person-to-person, not through radio waves. 'Leaked documents' is a common fake news tactic."
  },
]

// Source Matching Data
const sourceMatching = [
  {
    claim: "The Earth's average temperature has risen by 1.1°C since pre-industrial times",
    bestSource: "peer",
    sources: [
      { id: "peer", label: "Peer-reviewed scientific journal", correct: true },
      { id: "blog", label: "Personal blog post", correct: false },
      { id: "social", label: "Social media post", correct: false },
    ]
  },
  {
    claim: "A local restaurant received a health code violation",
    bestSource: "local",
    sources: [
      { id: "local", label: "Local government health department records", correct: true },
      { id: "review", label: "Anonymous online review", correct: false },
      { id: "rumour", label: "Word of mouth from a friend", correct: false },
    ]
  },
  {
    claim: "A new medication has been approved for treating diabetes",
    bestSource: "tga",
    sources: [
      { id: "tga", label: "Therapeutic Goods Administration announcement", correct: true },
      { id: "ad", label: "Pharmaceutical company advertisement", correct: false },
      { id: "forum", label: "Health forum discussion", correct: false },
    ]
  },
  {
    claim: "Unemployment rate increased by 0.3% last quarter",
    bestSource: "abs",
    sources: [
      { id: "abs", label: "Australian Bureau of Statistics report", correct: true },
      { id: "opinion", label: "Political opinion column", correct: false },
      { id: "podcast", label: "Economics podcast", correct: false },
    ]
  },
]

// Red Flags Activity Data
const redFlagsScenarios = [
  {
    id: 1,
    content: "BREAKING: Scientists FINALLY Admit the TRUTH About Vaccines! Share Before They Delete This!",
    redFlags: [
      "Uses ALL CAPS for emotional manipulation",
      "Creates urgency with 'Share Before They Delete'",
      "Implies conspiracy with 'Finally Admit the TRUTH'",
      "Vague about which scientists and what truth"
    ]
  },
  {
    id: 2,
    content: "According to research published in Nature Medicine by Dr. Sarah Chen at Harvard Medical School, early intervention programs have shown a 23% improvement in outcomes for patients with Type 2 diabetes.",
    redFlags: []
  },
  {
    id: 3,
    content: "You won't BELIEVE what this celebrity said about the election! Click here to see the video that's going VIRAL!!!",
    redFlags: [
      "Clickbait language ('You won't BELIEVE')",
      "Excessive punctuation and caps",
      "Appeals to popularity ('going VIRAL')",
      "Vague about actual content"
    ]
  },
]

type ActivityTab = "headlines" | "sources" | "redflags"

export function ActivitiesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [activeActivity, setActiveActivity] = useState<ActivityTab>("headlines")
  
  // Headlines Game State
  const [currentHeadline, setCurrentHeadline] = useState(0)
  const [headlineScore, setHeadlineScore] = useState(0)
  const [headlineAnswered, setHeadlineAnswered] = useState(false)
  const [headlineResult, setHeadlineResult] = useState<"correct" | "wrong" | null>(null)
  const [shuffledHeadlines, setShuffledHeadlines] = useState(headlines)

  // Source Matching State
  const [currentSourceQ, setCurrentSourceQ] = useState(0)
  const [sourceScore, setSourceScore] = useState(0)
  const [sourceAnswered, setSourceAnswered] = useState(false)
  const [selectedSource, setSelectedSource] = useState<string | null>(null)

  // Red Flags State
  const [currentRedFlag, setCurrentRedFlag] = useState(0)
  const [showRedFlags, setShowRedFlags] = useState(false)

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

  // Shuffle headlines on mount
  useEffect(() => {
    setShuffledHeadlines([...headlines].sort(() => Math.random() - 0.5))
  }, [])

  const handleHeadlineAnswer = (guessReal: boolean) => {
    if (headlineAnswered) return
    setHeadlineAnswered(true)
    const isCorrect = guessReal === shuffledHeadlines[currentHeadline].isReal
    setHeadlineResult(isCorrect ? "correct" : "wrong")
    if (isCorrect) setHeadlineScore(prev => prev + 1)
  }

  const nextHeadline = () => {
    if (currentHeadline < shuffledHeadlines.length - 1) {
      setCurrentHeadline(prev => prev + 1)
      setHeadlineAnswered(false)
      setHeadlineResult(null)
    }
  }

  const resetHeadlines = () => {
    setShuffledHeadlines([...headlines].sort(() => Math.random() - 0.5))
    setCurrentHeadline(0)
    setHeadlineScore(0)
    setHeadlineAnswered(false)
    setHeadlineResult(null)
  }

  const handleSourceAnswer = (sourceId: string) => {
    if (sourceAnswered) return
    setSelectedSource(sourceId)
    setSourceAnswered(true)
    if (sourceMatching[currentSourceQ].sources.find(s => s.id === sourceId)?.correct) {
      setSourceScore(prev => prev + 1)
    }
  }

  const nextSourceQ = () => {
    if (currentSourceQ < sourceMatching.length - 1) {
      setCurrentSourceQ(prev => prev + 1)
      setSourceAnswered(false)
      setSelectedSource(null)
    }
  }

  const resetSources = () => {
    setCurrentSourceQ(0)
    setSourceScore(0)
    setSourceAnswered(false)
    setSelectedSource(null)
  }

  const nextRedFlag = () => {
    if (currentRedFlag < redFlagsScenarios.length - 1) {
      setCurrentRedFlag(prev => prev + 1)
      setShowRedFlags(false)
    }
  }

  const resetRedFlags = () => {
    setCurrentRedFlag(0)
    setShowRedFlags(false)
  }

  return (
    <section
      ref={sectionRef}
      id="activities"
      className="py-24 relative"
      aria-labelledby="activities-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Gamepad2 className="w-4 h-4 text-accent" aria-hidden="true" />
            <span className="text-sm text-muted-foreground">Interactive Learning</span>
          </div>
          <h2 id="activities-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            Practice <span className="text-gradient">Activities</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Test your fact-checking skills with these interactive exercises. 
            Learning by doing is the best way to develop critical thinking habits.
          </p>
        </div>

        {/* Activity Selector */}
        <div className={`flex flex-wrap justify-center gap-3 mb-8 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {[
            { id: "headlines", label: "Spot the Fake" },
            { id: "sources", label: "Source Matching" },
            { id: "redflags", label: "Red Flag Finder" },
          ].map((activity) => (
            <Button
              key={activity.id}
              variant={activeActivity === activity.id ? "default" : "outline"}
              onClick={() => setActiveActivity(activity.id as ActivityTab)}
              className={`glass transition-all ${
                activity.id === "redflags"
                  ? activeActivity === activity.id
                    ? "bg-destructive/30 border-destructive/50 hover:bg-destructive/40"
                    : "hover:bg-destructive/20"
                  : activeActivity === activity.id
                    ? "bg-primary/30 border-primary/50"
                    : ""
              }`}
            >
              {activity.label}
            </Button>
          ))}
        </div>

        {/* Activities Container */}
        <div className={`glass rounded-3xl p-6 md:p-10 max-w-4xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          
          {/* Headlines Activity */}
          {activeActivity === "headlines" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Spot the Fake Headline</h3>
                  <p className="text-sm text-muted-foreground">Is this headline from a credible source or fake news?</p>
                </div>
                <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                  <Trophy className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span className="font-semibold text-foreground">{headlineScore}/{shuffledHeadlines.length}</span>
                </div>
              </div>

              <Progress value={(currentHeadline / shuffledHeadlines.length) * 100} className="h-2 mb-6" />

              <div className="glass-strong rounded-2xl p-6 min-h-30 flex items-center justify-center">
                <p className="text-lg md:text-xl text-center text-foreground font-medium">
                  &ldquo;{shuffledHeadlines[currentHeadline].text}&rdquo;
                </p>
              </div>

              {!headlineAnswered ? (
                <div className="flex gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => handleHeadlineAnswer(true)}
                    className="glass hover:bg-success/20 border-success/30 text-foreground"
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2 text-success" />
                    Real Headline
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => handleHeadlineAnswer(false)}
                    className="glass hover:bg-destructive/20 border-destructive/30 text-foreground"
                  >
                    <XCircle className="w-5 h-5 mr-2 text-destructive" />
                    Fake Headline
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl ${headlineResult === "correct" ? "bg-success/20 border border-success/30" : "bg-destructive/20 border border-destructive/30"}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {headlineResult === "correct" ? (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                      <span className={`font-semibold ${headlineResult === "correct" ? "text-success" : "text-destructive"}`}>
                        {headlineResult === "correct" ? "Correct!" : "Not quite!"}
                      </span>
                      <span className="text-muted-foreground">
                        This headline is {shuffledHeadlines[currentHeadline].isReal ? "REAL" : "FAKE"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{shuffledHeadlines[currentHeadline].explanation}</p>
                  </div>

                  <div className="flex justify-center gap-4">
                    {currentHeadline < shuffledHeadlines.length - 1 ? (
                      <Button onClick={nextHeadline} className="glass">
                        Next Headline <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button onClick={resetHeadlines} className="glass">
                        <RefreshCw className="w-4 h-4 mr-2" /> Play Again
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Source Matching Activity */}
          {activeActivity === "sources" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Source Matching</h3>
                  <p className="text-sm text-muted-foreground">Which source would be most reliable for this claim?</p>
                </div>
                <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                  <Trophy className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span className="font-semibold text-foreground">{sourceScore}/{sourceMatching.length}</span>
                </div>
              </div>

              <Progress value={(currentSourceQ / sourceMatching.length) * 100} className="h-2 mb-6" />

              <div className="glass-strong rounded-2xl p-6 mb-6">
                <p className="text-sm text-muted-foreground mb-2">Verify this claim:</p>
                <p className="text-lg text-foreground font-medium">&ldquo;{sourceMatching[currentSourceQ].claim}&rdquo;</p>
              </div>

              <div className="space-y-3">
                {sourceMatching[currentSourceQ].sources.map((source) => {
                  const isSelected = selectedSource === source.id
                  const isCorrect = source.correct
                  const showResult = sourceAnswered

                  return (
                    <button
                      key={source.id}
                      onClick={() => handleSourceAnswer(source.id)}
                      disabled={sourceAnswered}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                        showResult
                          ? isCorrect
                            ? "bg-success/20 border-2 border-success/50"
                            : isSelected
                              ? "bg-destructive/20 border-2 border-destructive/50"
                              : "glass opacity-50"
                          : "glass hover:bg-secondary/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-foreground">{source.label}</span>
                        {showResult && isCorrect && <CheckCircle2 className="w-5 h-5 text-success" />}
                        {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive" />}
                      </div>
                    </button>
                  )
                })}
              </div>

              {sourceAnswered && (
                <div className="flex justify-center mt-6">
                  {currentSourceQ < sourceMatching.length - 1 ? (
                    <Button onClick={nextSourceQ} className="glass">
                      Next Question <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={resetSources} className="glass">
                      <RefreshCw className="w-4 h-4 mr-2" /> Play Again
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Red Flags Activity */}
          {activeActivity === "redflags" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Red Flag Finder</h3>
                  <p className="text-sm text-muted-foreground">Can you spot the warning signs of misinformation?</p>
                </div>
                <span className="glass px-4 py-2 rounded-full text-sm text-muted-foreground">
                  {currentRedFlag + 1} of {redFlagsScenarios.length}
                </span>
              </div>

              <div className="glass-strong rounded-2xl p-6">
                <p className="text-lg text-foreground leading-relaxed">
                  {redFlagsScenarios[currentRedFlag].content}
                </p>
              </div>

              {!showRedFlags ? (
                <div className="flex justify-center">
                  <Button onClick={() => setShowRedFlags(true)} className="glass">
                    <Lightbulb className="w-4 h-4 mr-2" /> Reveal Red Flags
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {redFlagsScenarios[currentRedFlag].redFlags.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-destructive mb-3">Red Flags Found:</p>
                      {redFlagsScenarios[currentRedFlag].redFlags.map((flag, i) => (
                        <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                          <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          <span className="text-sm text-foreground">{flag}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-success/20 border border-success/30">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-success" />
                        <span className="font-semibold text-success">No Red Flags!</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        This appears to be a credible source with specific attribution, measured language, and verifiable claims.
                      </p>
                    </div>
                  )}

                  <div className="flex justify-center gap-4 mt-6">
                    {currentRedFlag < redFlagsScenarios.length - 1 ? (
                      <Button onClick={nextRedFlag} className="glass">
                        Next Example <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button onClick={resetRedFlags} className="glass">
                        <RefreshCw className="w-4 h-4 mr-2" /> Start Over
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
