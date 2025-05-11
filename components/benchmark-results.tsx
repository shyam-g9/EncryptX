"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface BenchmarkResult {
  algorithm: string
  speed: number
  memory: number
  keySize: number
  securityStrength: number
  energyConsumption: number
  errorPropagation: number
}

export function BenchmarkResults({ results }: { results: BenchmarkResult[] }) {
  // Find the best algorithm for each metric
  const bestSpeed = Math.min(...results.map((r) => r.speed))
  const bestMemory = Math.min(...results.map((r) => r.memory))
  const bestKeySize = Math.max(...results.map((r) => r.keySize))
  const bestSecurity = Math.max(...results.map((r) => r.securityStrength))
  const bestEnergy = Math.min(...results.map((r) => r.energyConsumption))
  const bestErrorProp = Math.min(...results.map((r) => r.errorPropagation))

  return (
    <div className="rounded-md border border-white/10 overflow-hidden">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="hover:bg-white/5 border-white/10">
            <TableHead className="w-[180px] text-white">Algorithm</TableHead>
            <TableHead className="text-white">Speed (ms)</TableHead>
            <TableHead className="text-white">Memory (MB)</TableHead>
            <TableHead className="text-white">Key Size (bits)</TableHead>
            <TableHead className="text-white">Security Strength</TableHead>
            <TableHead className="text-white">Energy Consumption</TableHead>
            <TableHead className="text-white">Error Propagation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result) => (
            <TableRow key={result.algorithm} className="hover:bg-white/5 border-white/10">
              <TableCell className="font-medium text-white">{result.algorithm}</TableCell>
              <TableCell className="text-emerald-100">
                {result.speed}
                {result.speed === bestSpeed && (
                  <Badge variant="outline" className="ml-2 bg-emerald-900/50 text-emerald-300 border-emerald-700/50">
                    Best
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-emerald-100">
                {result.memory}
                {result.memory === bestMemory && (
                  <Badge variant="outline" className="ml-2 bg-emerald-900/50 text-emerald-300 border-emerald-700/50">
                    Best
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-emerald-100">
                {result.keySize}
                {result.keySize === bestKeySize && (
                  <Badge variant="outline" className="ml-2 bg-emerald-900/50 text-emerald-300 border-emerald-700/50">
                    Best
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-emerald-100">
                {result.securityStrength}
                {result.securityStrength === bestSecurity && (
                  <Badge variant="outline" className="ml-2 bg-emerald-900/50 text-emerald-300 border-emerald-700/50">
                    Best
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-emerald-100">
                {result.energyConsumption}
                {result.energyConsumption === bestEnergy && (
                  <Badge variant="outline" className="ml-2 bg-emerald-900/50 text-emerald-300 border-emerald-700/50">
                    Best
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-emerald-100">
                {result.errorPropagation}
                {result.errorPropagation === bestErrorProp && (
                  <Badge variant="outline" className="ml-2 bg-emerald-900/50 text-emerald-300 border-emerald-700/50">
                    Best
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
