"use client"

import { Search, ArrowUp, BookOpen, Brain, FileQuestion, CheckCircle, ExternalLink, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "#home", icon: Shield },
  { name: "Learn", href: "#learn", icon: BookOpen },
  { name: "Techniques", href: "#techniques", icon: Brain },
  { name: "Activities", href: "#activities", icon: FileQuestion },
  { name: "Quiz", href: "#quiz", icon: CheckCircle },
  { name: "Resources", href: "#resources", icon: ExternalLink },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative py-16 border-t border-glass-border">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
                <Search className="relative w-8 h-8 text-primary" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold text-foreground">
                <span className="text-primary">Truth</span>Finder
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              An educational portfolio dedicated to teaching critical thinking skills 
              for identifying and debunking misinformation in the digital age.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <nav aria-label="Footer navigation">
              <ul className="grid grid-cols-2 gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                      >
                        <Icon className="w-4 h-4" aria-hidden="true" />
                        {item.name}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">About This Project</h4>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              This portfolio was created as part of the Critical Thinking course at 
              Penrith Selective High School, focusing on the essential skill of 
              debunking misinformation.
            </p>
            <p className="text-xs text-muted-foreground">
              Assessment Task 1 • Term 2, 2026
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-glass-border gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            Critical Thinking Portfolio • Debunking Misinformation
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="glass hover:bg-primary/20 text-muted-foreground hover:text-foreground"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Back to Top
          </Button>
        </div>
      </div>
    </footer>
  )
}
