"use client"

import { useEffect, useRef, useState } from "react"
import { 
  AlertCircle, 
  Eye, 
  Share2, 
  Target, 
  TrendingDown, 
  Users,
  ChevronRight,
  Lightbulb
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const misinformationTypes = [
  {
    icon: AlertCircle,
    title: "Disinformation",
    description: "False information deliberately created and spread to deceive people.",
    examples: ["Fake news articles designed to manipulate public opinion", "Propaganda created by state actors", "Fabricated statistics in political campaigns"],
    color: "text-destructive"
  },
  {
    icon: Share2,
    title: "Misinformation",
    description: "False information shared without intent to deceive, often by people who believe it's true.",
    examples: ["Forwarding unverified health claims", "Sharing outdated scientific studies", "Spreading urban legends"],
    color: "text-warning"
  },
  {
    icon: Target,
    title: "Malinformation",
    description: "True information used out of context to mislead, manipulate, or cause harm.",
    examples: ["Leaked private information used to harm someone", "Old photos shared as current events", "Selective quoting to change meaning"],
    color: "text-primary"
  },
  {
    icon: Eye,
    title: "Satire/Parody",
    description: "Content created for entertainment that may be mistaken for real news.",
    examples: ["Satirical news sites taken literally", "Parody social media accounts", "Exaggerated headlines for humour"],
    color: "text-accent"
  },
]

const impacts = [
  {
    icon: Users,
    title: "Social Division",
    description: "Misinformation creates polarisation, erodes trust between communities, and weakens social cohesion by exploiting existing tensions."
  },
  {
    icon: TrendingDown,
    title: "Economic Harm",
    description: "False information can manipulate markets, damage business reputations, and lead to poor financial decisions by consumers."
  },
  {
    icon: AlertCircle,
    title: "Public Health Risks",
    description: "Health misinformation can lead to vaccine hesitancy, dangerous self-treatments, and delays in seeking proper medical care."
  },
  {
    icon: Target,
    title: "Democratic Erosion",
    description: "When citizens cannot agree on basic facts, democratic processes are undermined and informed decision-making becomes impossible."
  },
]

export function LearnSection() {
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <section
      ref={sectionRef}
      id="learn"
      className="py-24 relative"
      aria-labelledby="learn-heading"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Lightbulb className="w-4 h-4 text-accent" aria-hidden="true" />
            <span className="text-sm text-muted-foreground">Understanding the Problem</span>
          </div>
          <h2 id="learn-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            What is <span className="text-gradient">Misinformation?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Before we can debunk false information, we need to understand its different forms 
            and why it spreads so effectively in our digital world.
          </p>
        </div>

        {/* Types of Misinformation */}
        <div className={`grid md:grid-cols-2 gap-6 mb-20 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {misinformationTypes.map((type, index) => {
            const Icon = type.icon
            return (
              <div
                key={type.title}
                className="glass rounded-2xl p-6 hover:bg-secondary/30 transition-all duration-300 group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-secondary/50 ${type.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{type.title}</h3>
                    <p className="text-muted-foreground mb-4">{type.description}</p>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="examples" className="border-glass-border">
                        <AccordionTrigger className="text-sm text-primary hover:no-underline py-2">
                          <span className="flex items-center gap-2">
                            View Examples
                            <ChevronRight className="w-4 h-4 transition-transform" />
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {type.examples.map((example, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-primary mt-1" aria-hidden="true">•</span>
                                {example}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Why Misinformation Spreads */}
        <div className={`glass rounded-3xl p-8 md:p-12 mb-20 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
            Why Does Misinformation <span className="text-primary">Spread?</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Emotional Appeal", desc: "Content that triggers strong emotions like fear, anger, or surprise spreads faster than neutral information." },
              { title: "Confirmation Bias", desc: "We tend to believe and share information that confirms our existing beliefs without questioning it." },
              { title: "Social Proof", desc: "When we see others sharing content, we assume it must be true and are more likely to share it ourselves." },
              { title: "Information Overload", desc: "The sheer volume of content makes it difficult to verify everything before sharing." },
            ].map((item, index) => (
              <div key={index} className="text-center p-4">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
                  {index + 1}
                </div>
                <h4 className="font-semibold mb-2 text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Section */}
        <div className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
            The Real-World <span className="text-destructive">Impact</span>
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {impacts.map((impact, index) => {
              const Icon = impact.icon
              return (
                <div
                  key={impact.title}
                  className="glass rounded-2xl p-6 hover:bg-destructive/10 transition-all duration-300 group border-l-4 border-destructive/50"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-destructive/20 text-destructive group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">{impact.title}</h4>
                      <p className="text-sm text-muted-foreground">{impact.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
