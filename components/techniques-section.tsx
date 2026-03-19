"use client"

import { useEffect, useRef, useState } from "react"
import { 
  Search, 
  Eye, 
  Users, 
  Clock, 
  FileSearch,
  Brain,
  CheckCircle2,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const techniques = [
  {
    id: "sift",
    title: "SIFT Method",
    icon: FileSearch,
    description: "A powerful four-step process developed by Mike Caulfield for quickly evaluating information online.",
    steps: [
      {
        letter: "S",
        name: "Stop",
        detail: "Before you share or react, pause. Take a breath. Don't let your emotions drive you to spread potentially false information.",
        tip: "Ask yourself: Am I certain this is true? What's my source?"
      },
      {
        letter: "I",
        name: "Investigate the Source",
        detail: "Who created this content? What's their expertise, motivation, and track record? Are they a credible authority?",
        tip: "Search for the author/organisation + 'about' or 'bias' to learn more."
      },
      {
        letter: "F",
        name: "Find Better Coverage",
        detail: "Look for other sources reporting on the same claim. Are reputable news organisations covering this story?",
        tip: "If only one obscure site is reporting something major, be suspicious."
      },
      {
        letter: "T",
        name: "Trace Claims",
        detail: "Find the original source of the claim. Was it taken out of context? Does the original support what's being claimed?",
        tip: "Click through links, find the original study, quote, or event."
      }
    ]
  },
  {
    id: "lateral",
    title: "Lateral Reading",
    icon: Eye,
    description: "Instead of deeply analysing a single source, quickly check what others say about that source by opening new tabs.",
    steps: [
      {
        letter: "1",
        name: "Open New Tabs",
        detail: "When you encounter a claim or source, immediately open new browser tabs to research it rather than staying on the original page.",
        tip: "Use the website's name + 'reliability' or 'fact check' as search terms."
      },
      {
        letter: "2",
        name: "Check Multiple Sources",
        detail: "Look for what Wikipedia, fact-checkers, and news outlets say about the source and its claims.",
        tip: "Pay attention to patterns - do multiple credible sources agree?"
      },
      {
        letter: "3",
        name: "Compare Perspectives",
        detail: "See how different sources frame the same story. This helps identify potential bias or missing context.",
        tip: "Look for sources with different political leanings covering the same story."
      },
      {
        letter: "4",
        name: "Return with Context",
        detail: "Go back to the original source with your newfound knowledge and evaluate it critically.",
        tip: "Your understanding should be richer now - does the source still seem credible?"
      }
    ]
  },
  {
    id: "craap",
    title: "CRAAP Test",
    icon: Search,
    description: "A comprehensive framework for evaluating sources based on five key criteria.",
    steps: [
      {
        letter: "C",
        name: "Currency",
        detail: "When was this published or last updated? Is the information timely for your needs?",
        tip: "Check publication dates and look for 'last updated' notices."
      },
      {
        letter: "R",
        name: "Relevance",
        detail: "Does this information actually relate to your question? Is it at an appropriate level?",
        tip: "Skim headings and conclusions to quickly assess relevance."
      },
      {
        letter: "A",
        name: "Authority",
        detail: "Who is the author/publisher? What are their credentials? Is there contact information?",
        tip: "Look for 'About Us' pages and author bios."
      },
      {
        letter: "A",
        name: "Accuracy",
        detail: "Is the information supported by evidence? Can you verify claims elsewhere? Are there citations?",
        tip: "Check if sources are linked and actually support the claims."
      },
      {
        letter: "P",
        name: "Purpose",
        detail: "Why does this content exist? Is it to inform, persuade, sell, or entertain?",
        tip: "Look for advertising, donation requests, or political messaging."
      }
    ]
  }
]

const quickTips = [
  { icon: Clock, tip: "Breaking news is often wrong - wait for updates before sharing" },
  { icon: Users, tip: "Check if experts in the relevant field support the claim" },
  { icon: Eye, tip: "Reverse image search photos to find their original context" },
  { icon: Brain, tip: "Be extra skeptical of content that makes you very emotional" },
]

export function TechniquesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("sift")
  const sectionRef = useRef<HTMLElement>(null)

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

  const activeTechnique = techniques.find(t => t.id === activeTab)

  return (
    <section
      ref={sectionRef}
      id="techniques"
      className="py-24 relative"
      aria-labelledby="techniques-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Brain className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-sm text-muted-foreground">Debunking Strategies</span>
          </div>
          <h2 id="techniques-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            Fact-Checking <span className="text-gradient">Techniques</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Master these proven methods used by professional fact-checkers and researchers 
            to evaluate information and identify misinformation.
          </p>
        </div>

        {/* Techniques Tabs */}
        <div className={`mb-16 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="glass w-full max-w-2xl mx-auto grid grid-cols-3 mb-8 p-1">
              {techniques.map((technique) => {
                const Icon = technique.icon
                return (
                  <TabsTrigger
                    key={technique.id}
                    value={technique.id}
                    className="flex items-center gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg transition-all"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden sm:inline">{technique.title}</span>
                    <span className="sm:hidden">{technique.id.toUpperCase()}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {techniques.map((technique) => (
              <TabsContent key={technique.id} value={technique.id} className="mt-0">
                <div className="glass rounded-3xl p-6 md:p-10">
                  {/* Technique Header */}
                  <div className="text-center mb-10">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-foreground">{technique.title}</h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto">{technique.description}</p>
                  </div>

                  {/* Steps */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {technique.steps.map((step, index) => (
                      <div
                        key={`${technique.id}-${index}`}
                        className="relative glass rounded-2xl p-6 hover:bg-secondary/30 transition-all duration-300 group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-xl font-bold text-primary group-hover:scale-110 transition-transform shrink-0">
                            {step.letter}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-2 text-foreground">{step.name}</h4>
                            <p className="text-sm text-muted-foreground mb-3">{step.detail}</p>
                            <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
                              <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" aria-hidden="true" />
                              <p className="text-xs text-accent">{step.tip}</p>
                            </div>
                          </div>
                        </div>
                        {index < technique.steps.length - 1 && (
                          <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-primary/30" aria-hidden="true">
                            <ArrowRight className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Quick Tips */}
        <div className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h3 className="text-xl font-semibold mb-6 text-center text-foreground">Quick Tips to Remember</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickTips.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="glass rounded-xl p-4 flex items-center gap-3 hover:bg-secondary/30 transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-primary/20 text-primary shrink-0">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-muted-foreground">{item.tip}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
