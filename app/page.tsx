import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { LearnSection } from "@/components/learn-section"
import { VideoSection } from "@/components/video-section"
import { TechniquesSection } from "@/components/techniques-section"
import { ActivitiesSection } from "@/components/activities-section"
import { QuizSection } from "@/components/quiz-section"
import { ResourcesSection } from "@/components/resources-section"
import { Footer } from "@/components/footer"

export default function DebunkingMisinformationPage() {
  return (
    <main className="relative overflow-hidden">
      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            background: `
              radial-gradient(ellipse at 20% 20%, rgba(56, 189, 248, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, rgba(45, 212, 191, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(56, 189, 248, 0.03) 0%, transparent 70%)
            `
          }}
        />
        
        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />
        <LearnSection />
        <VideoSection />
        <TechniquesSection />
        <ActivitiesSection />
        <ResourcesSection />
        <QuizSection />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
