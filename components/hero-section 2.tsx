"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, AlertTriangle, CheckCircle2, Search, Shield } from "lucide-react"
import { Analytics } from "@vercel/analytics/next"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToLearn = () => {
    document.getElementById("learn")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      aria-labelledby="hero-heading"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/10 rounded-full blur-3xl animate-float" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div 
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8"
            style={{ transitionDelay: "200ms" }}
          >
            <Shield className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-sm text-muted-foreground">Critical Thinking | Penrith Selective High School</span>
          </div>

          {/* Main Heading */}
          <h1 
            id="hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance"
          >
            <span className="text-foreground">Debunking</span>
            <br />
            <span className="text-gradient">Misinformation</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed text-pretty">
            A Year 10 Critical Thinking resource for identifying, analysing, and countering 
            false information in the digital age. Become a critical thinker and defend against deception.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              onClick={scrollToLearn}
              className="glass hover:bg-primary/20 text-foreground border-primary/30 hover:border-primary/50 transition-all duration-300 group px-8"
            >
              <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
              Start Learning
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" })}
              className="glass hover:bg-accent/20 text-foreground border-accent/30 hover:border-accent/50 transition-all duration-300"
            >
              Take the Quiz
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: AlertTriangle, value: "70%", label: "Adults encounter fake news weekly", color: "text-destructive" },
              { icon: Search, value: "5", label: "Key verification techniques", color: "text-primary" },
              { icon: CheckCircle2, value: "3 min", label: "Average fact-check time", color: "text-accent" },
              { icon: Shield, value: "100%", label: "Preventable with training", color: "text-success" },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="glass rounded-2xl p-4 transition-all duration-300 hover:scale-105 hover:bg-secondary/30"
                >
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} aria-hidden="true" />
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToLearn}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer group"
          aria-label="Scroll to learn more"
        >
          <div className="glass rounded-full p-3 group-hover:bg-primary/20 transition-colors">
            <ArrowDown className="w-5 h-5 text-primary" />
          </div>
        </button>
      </div>
    </section>
  )
}
