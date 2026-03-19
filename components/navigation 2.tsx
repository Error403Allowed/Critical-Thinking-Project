"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, X, Search, BookOpen, Shield, Brain, FileQuestion, CheckCircle, ExternalLink, Play } from "lucide-react"
import Link from "next/link"

const navItems = [
  { name: "Home", href: "#home", icon: Shield },
  { name: "Learn", href: "#learn", icon: BookOpen },
  { name: "Videos", href: "#videos", icon: Play },
  { name: "Techniques", href: "#techniques", icon: Brain },
  { name: "Activities", href: "#activities", icon: FileQuestion },
  { name: "Resources", href: "#resources", icon: ExternalLink },
  { name: "Quiz", href: "#quiz", icon: CheckCircle },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.replace("#", ""))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="container mx-auto px-4 flex items-center justify-between" aria-label="Main navigation">
        <Link 
          href="#home" 
          className="flex items-center gap-3 group"
          onClick={() => handleNavClick("#home")}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full group-hover:bg-primary/50 transition-colors" />
            <Search className="relative w-8 h-8 text-primary" aria-hidden="true" />
          </div>
          <span className="text-xl font-bold text-foreground">
            <span className="text-primary">Truth</span>Finder
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-1" role="menubar">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.href.replace("#", "")
            return (
              <li key={item.name} role="none">
                <button
                  role="menuitem"
                  onClick={() => handleNavClick(item.href)}
                  className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
                    isActive
                      ? "glass text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span>{item.name}</span>
                </button>
              </li>
            )
          })}
        </ul>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="glass"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="glass-strong border-glass-border w-80">
            <SheetTitle className="text-foreground flex items-center gap-2 mb-8">
              <Search className="w-6 h-6 text-primary" />
              <span className="text-primary">Truth</span>Finder
            </SheetTitle>
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.href.replace("#", "")
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 text-left ${
                      isActive
                        ? "glass text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
