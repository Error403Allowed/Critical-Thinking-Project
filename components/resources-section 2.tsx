"use client"

import { useEffect, useRef, useState } from "react"
import { 
  ExternalLink, 
  BookOpen, 
  Globe, 
  Video, 
  FileText,
  Search,
  ArrowUpRight,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"

const factCheckingSites = [
  {
    name: "RMIT ABC Fact Check",
    url: "https://www.abc.net.au/news/factcheck",
    description: "Australia's leading fact-checking unit examining public statements by politicians and public figures.",
    region: "Australia"
  },
  {
    name: "Snopes",
    url: "https://www.snopes.com",
    description: "One of the oldest and most comprehensive fact-checking resources, covering urban legends, folklore, and current events.",
    region: "International"
  },
  {
    name: "AFP Fact Check",
    url: "https://factcheck.afp.com",
    description: "Agence France-Presse's dedicated fact-checking service covering misinformation worldwide.",
    region: "International"
  },
  {
    name: "Full Fact",
    url: "https://fullfact.org",
    description: "UK's independent fact-checking charity, helping people understand claims made by politicians and media.",
    region: "UK"
  },
  {
    name: "PolitiFact",
    url: "https://www.politifact.com",
    description: "Pulitzer Prize-winning fact-checking operation rating the accuracy of claims by elected officials.",
    region: "USA"
  },
  {
    name: "First Draft",
    url: "https://firstdraftnews.org",
    description: "Research lab helping journalists, academics, and technologists address challenges of misinformation.",
    region: "International"
  },
]

const verificationTools = [
  {
    name: "Google Reverse Image Search",
    url: "https://images.google.com",
    description: "Upload an image to find its original source and context.",
    icon: Search
  },
  {
    name: "TinEye",
    url: "https://tineye.com",
    description: "Reverse image search engine to track where images appear online.",
    icon: Search
  },
  {
    name: "Wayback Machine",
    url: "https://web.archive.org",
    description: "View archived versions of websites to see how content has changed over time.",
    icon: Globe
  },
  {
    name: "InVID",
    url: "https://www.invid-project.eu/tools-and-services/",
    description: "Video verification tools including reverse video search and keyframe extraction.",
    icon: Video
  },
]

const educationalResources = [
  {
    name: "Crash Course: Navigating Digital Information",
    url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtN07XYqqWSKpPrtNDiCHTzU",
    description: "Free video series teaching media literacy skills for the digital age.",
    type: "Video Course"
  },
  {
    name: "The News Literacy Project",
    url: "https://newslit.org",
    description: "Educational resources helping students and the public become news-literate.",
    type: "Educational Platform"
  },
  {
    name: "Stanford History Education Group",
    url: "https://cor.stanford.edu",
    description: "Free digital literacy curriculum based on how professional fact-checkers evaluate information.",
    type: "Curriculum"
  },
  {
    name: "MediaWise",
    url: "https://www.poynter.org/mediawise",
    description: "Digital media literacy program helping people sort fact from fiction.",
    type: "Program"
  },
]

const furtherReading = [
  {
    title: "How to Spot Fake News",
    source: "IFLA",
    url: "https://www.ifla.org/publications/node/11174",
    description: "International Federation of Library Associations' guide to identifying fake news."
  },
  {
    title: "Verification Handbook",
    source: "European Journalism Centre",
    url: "https://datajournalism.com/read/handbook/verification-1",
    description: "Definitive guide to verifying digital content for emergency coverage."
  },
  {
    title: "The Psychology of Misinformation",
    source: "American Psychological Association",
    url: "https://www.apa.org/topics/misinformation-disinformation",
    description: "Research on why people believe and share misinformation."
  },
]

export function ResourcesSection() {
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
      id="resources"
      className="py-24 relative"
      aria-labelledby="resources-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <ExternalLink className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-sm text-muted-foreground">Further Learning</span>
          </div>
          <h2 id="resources-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            Helpful <span className="text-gradient">Resources</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Continue your journey with these trusted fact-checking sites, verification tools, 
            and educational resources curated for critical thinkers.
          </p>
        </div>

        {/* Fact-Checking Sites */}
        <div className={`mb-16 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/20 text-primary">
              <Search className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Fact-Checking Websites</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {factCheckingSites.map((site, index) => (
              <a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl p-5 hover:bg-secondary/30 transition-all duration-300 group block"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{site.name}</h4>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">{site.description}</p>
                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  <Globe className="w-3 h-3" />
                  {site.region}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Verification Tools */}
        <div className={`mb-16 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-accent/20 text-accent">
              <Globe className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Verification Tools</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {verificationTools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-2xl p-5 hover:bg-secondary/30 transition-all duration-300 group flex items-start gap-4"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="p-3 rounded-xl bg-accent/20 text-accent group-hover:scale-110 transition-transform shrink-0">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">{tool.name}</h4>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* Educational Resources */}
        <div className={`mb-16 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/20 text-primary">
              <BookOpen className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Educational Resources</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {educationalResources.map((resource, index) => (
              <a
                key={resource.name}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl p-5 hover:bg-secondary/30 transition-all duration-300 group block"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">{resource.type}</span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all" />
                </div>
                <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{resource.name}</h4>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Further Reading */}
        <div className={`glass rounded-3xl p-8 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-accent/20 text-accent">
              <FileText className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Further Reading</h3>
          </div>
          <div className="space-y-4">
            {furtherReading.map((item, index) => (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/30 transition-all duration-300 group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">{item.title}</h4>
                    <span className="text-xs text-muted-foreground">— {item.source}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0 ml-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
