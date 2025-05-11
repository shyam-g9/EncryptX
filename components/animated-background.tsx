"use client"

import type React from "react"

import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"

export function AnimatedBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Canvas Reveal Effect Background */}
      <div className="fixed inset-0 -z-10">
        <CanvasRevealEffect
          animationSpeed={1.5}
          containerClassName="bg-black"
          colors={[
            [0, 100, 80], // Dark green
            [0, 130, 100], // Medium green
            [0, 160, 120], // Light green
          ]}
          dotSize={3}
          opacities={[0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1]}
        />
        {/* Overlay gradient for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
