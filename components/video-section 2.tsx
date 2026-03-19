"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, SkipBack } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Video {
  id: string
  title: string
  description: string
  embedUrl: string
  duration: string
}

const videos: Video[] = [
  {
    id: "intro",
    title: "What is Misinformation?",
    description: "An introduction to the different types of false information and why it matters for Year 10 students navigating the digital world.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "4:32"
  },
  {
    id: "spotting",
    title: "How to Spot Fake News",
    description: "Learn the SIFT method and other practical techniques to identify misinformation before you share it.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "6:15"
  },
  {
    id: "impact",
    title: "The Real-World Impact",
    description: "Case studies showing how misinformation has affected communities, elections, and public health.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "5:48"
  }
]

export function VideoSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeVideo, setActiveVideo] = useState(0)
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

  const currentVideo = videos[activeVideo]

  return (
    <section
      id="videos"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      aria-labelledby="videos-heading"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Play className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-sm text-muted-foreground">Video Resources</span>
          </div>
          <h2 id="videos-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            <span className="text-foreground">Watch & </span>
            <span className="text-gradient">Learn</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore our video resources designed specifically for Year 10 students at Penrith Selective High School. 
            Each video covers key aspects of identifying and debunking misinformation.
          </p>
        </div>

        {/* Video Player Area */}
        <div className={`max-w-5xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Main Video Container */}
          <div className="glass rounded-3xl overflow-hidden mb-6">
            {/* Video Embed */}
            <div className="relative aspect-video bg-background/50">
              <iframe
                src={currentVideo.embedUrl}
                title={currentVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
              
              {/* Video Overlay for styling */}
              <div className="absolute inset-0 pointer-events-none border border-glass-border rounded-t-3xl" />
            </div>

            {/* Video Info */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {currentVideo.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {currentVideo.description}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground glass px-3 py-1 rounded-full shrink-0">
                  {currentVideo.duration}
                </span>
              </div>

              {/* Video Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveVideo(Math.max(0, activeVideo - 1))}
                    disabled={activeVideo === 0}
                    className="glass"
                    aria-label="Previous video"
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveVideo(Math.min(videos.length - 1, activeVideo + 1))}
                    disabled={activeVideo === videos.length - 1}
                    className="glass"
                    aria-label="Next video"
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  Video {activeVideo + 1} of {videos.length}
                </span>
              </div>
            </div>
          </div>

          {/* Video Thumbnails */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => setActiveVideo(index)}
                className={`glass rounded-2xl p-4 text-left transition-all duration-300 group ${
                  activeVideo === index 
                    ? "ring-2 ring-primary bg-primary/10" 
                    : "hover:bg-secondary/30"
                }`}
                aria-label={`Play ${video.title}`}
                aria-current={activeVideo === index ? "true" : "false"}
              >
                {/* Thumbnail placeholder */}
                <div className="relative aspect-video bg-background/50 rounded-xl mb-3 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      activeVideo === index 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary/50 text-foreground group-hover:bg-primary/50"
                    }`}>
                      <Play className="w-5 h-5 ml-0.5" />
                    </div>
                  </div>
                  {/* Duration badge */}
                  <span className="absolute bottom-2 right-2 text-xs bg-background/80 px-2 py-0.5 rounded">
                    {video.duration}
                  </span>
                </div>
                <h4 className={`font-medium text-sm mb-1 ${
                  activeVideo === index ? "text-primary" : "text-foreground"
                }`}>
                  {video.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {video.description}
                </p>
              </button>
            ))}
          </div>

          {/* Note about videos */}
          <p className="text-center text-sm text-muted-foreground mt-6 glass rounded-xl p-4">
            Note: Replace the placeholder video URLs with your own educational content videos for the best learning experience.
          </p>
        </div>
      </div>
    </section>
  )
}
