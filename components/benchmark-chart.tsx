"use client"

import { useEffect, useRef } from "react"

interface BenchmarkResult {
  algorithm: string
  speed: number
  memory: number
  keySize: number
  securityStrength: number
  energyConsumption: number
  errorPropagation: number
}

export function BenchmarkChart({ results }: { results: BenchmarkResult[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !results.length) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = 400

    // Normalize data for visualization
    const metrics = ["Speed", "Memory", "Key Size", "Security", "Energy", "Error Prop."]

    // Find min and max values for each metric to normalize
    const maxValues = {
      speed: Math.max(...results.map((r) => r.speed)),
      memory: Math.max(...results.map((r) => r.memory)),
      keySize: Math.max(...results.map((r) => r.keySize)),
      securityStrength: Math.max(...results.map((r) => r.securityStrength)),
      energyConsumption: Math.max(...results.map((r) => r.energyConsumption)),
      errorPropagation: Math.max(...results.map((r) => r.errorPropagation)),
    }

    // For speed, memory, energy, and error propagation, lower is better
    // For key size and security strength, higher is better
    const normalizedData = results.map((result) => ({
      algorithm: result.algorithm,
      values: [
        1 - result.speed / maxValues.speed, // Speed (lower is better)
        1 - result.memory / maxValues.memory, // Memory (lower is better)
        result.keySize / maxValues.keySize, // Key Size (higher is better)
        result.securityStrength / maxValues.securityStrength, // Security (higher is better)
        1 - result.energyConsumption / maxValues.energyConsumption, // Energy (lower is better)
        1 - result.errorPropagation / maxValues.errorPropagation, // Error Prop (lower is better)
      ],
    }))

    // Chart dimensions
    const padding = 50
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const barWidth = chartWidth / metrics.length / (results.length + 1)

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw chart background
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)"
    ctx.fillRect(padding, padding, chartWidth, chartHeight)

    // Draw grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + chartHeight - (chartHeight * i) / 5
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(padding + chartWidth, y)
      ctx.stroke()

      // Draw y-axis labels
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "right"
      ctx.fillText(`${i * 20}%`, padding - 10, y + 4)
    }

    // Draw x-axis
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(padding, padding + chartHeight)
    ctx.lineTo(padding + chartWidth, padding + chartHeight)
    ctx.stroke()

    // Draw metrics labels
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    metrics.forEach((metric, i) => {
      const x = padding + (i + 0.5) * (chartWidth / metrics.length)
      ctx.fillText(metric, x, padding + chartHeight + 20)
    })

    // Draw bars
    const colors = [
      "rgba(16, 185, 129, 0.8)", // Emerald
      "rgba(59, 130, 246, 0.8)", // Blue
      "rgba(245, 158, 11, 0.8)", // Amber
      "rgba(239, 68, 68, 0.8)", // Red
      "rgba(139, 92, 246, 0.8)", // Violet
      "rgba(236, 72, 153, 0.8)", // Pink
    ]

    normalizedData.forEach((data, dataIndex) => {
      data.values.forEach((value, i) => {
        const x = padding + i * (chartWidth / metrics.length) + (dataIndex + 1) * barWidth
        const barHeight = chartHeight * value

        // Draw bar
        ctx.fillStyle = colors[dataIndex % colors.length]
        ctx.fillRect(x, padding + chartHeight - barHeight, barWidth - 4, barHeight)
      })
    })

    // Draw legend
    const legendX = padding
    const legendY = 20

    normalizedData.forEach((data, i) => {
      const x = legendX + i * 120

      // Draw color box
      ctx.fillStyle = colors[i % colors.length]
      ctx.fillRect(x, legendY, 12, 12)

      // Draw algorithm name
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "left"
      ctx.fillText(data.algorithm, x + 18, legendY + 10)
    })
  }, [results])

  return (
    <div className="w-full h-[400px]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
