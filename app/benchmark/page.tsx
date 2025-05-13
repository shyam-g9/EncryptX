"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BarChart2, Upload, Clock, Database, Key, Shield, Zap, AlertTriangle, Download, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { runBenchmark } from "@/lib/encryption-service"
import { BenchmarkResults } from "@/components/benchmark-results"
import { BenchmarkChart } from "@/components/benchmark-chart"
import { AlgorithmInfo } from "@/components/algorithm-info"
import { AnimatedBackground } from "@/components/animated-background"

export default function BenchmarkPage() {
  const router = useRouter()
  const [inputType, setInputType] = useState<"text" | "file">("text")
  const [inputText, setInputText] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [selectedAlgorithms, setSelectedAlgorithms] = useState({
    aes: true,
    des: true,
    tripledes: true,
    blowfish: false,
    rsa: true,
    ecc: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any>(null)

  // Update the handleFileChange function to read file content
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Read the file content
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setInputText(event.target.result as string)
        }
      }

      // Read as text
      reader.readAsText(selectedFile)
    }
  }

  const handleAlgorithmChange = (algorithm: string, checked: boolean) => {
    setSelectedAlgorithms((prev) => ({
      ...prev,
      [algorithm]: checked,
    }))
  }

  // Update the handleRunBenchmark function to use the file content
  const handleRunBenchmark = async () => {
    setIsLoading(true)
    try {
      // Get the algorithms that are selected
      const algorithms = Object.entries(selectedAlgorithms)
        .filter(([_, isSelected]) => isSelected)
        .map(([name]) => name)

      // Get the input data - always use the inputText which now contains file content if a file was selected
      const inputData = inputText

      // Run the benchmark
      const benchmarkResults = await runBenchmark(algorithms, inputData)
      setResults(benchmarkResults)
    } catch (error) {
      console.error("Benchmark error:", error)
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportResults = () => {
    if (!results) return

    // Create CSV content
    const csvContent = [
      // Header row
      [
        "Algorithm",
        "Speed (ms)",
        "Memory (MB)",
        "Key Size (bits)",
        "Security Strength",
        "Energy Consumption",
        "Error Propagation",
      ].join(","),
      // Data rows
      ...results.map((result: any) =>
        [
          result.algorithm,
          result.speed,
          result.memory,
          result.keySize,
          result.securityStrength,
          result.energyConsumption,
          result.errorPropagation,
        ].join(","),
      ),
    ].join("\n")

    // Create a blob and download
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "benchmark-results.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <AnimatedBackground>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-4 text-white hover:bg-white/10">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold flex items-center gap-2 text-white">
            <BarChart2 className="h-8 w-8 text-emerald-400" />
            Benchmark Mode
          </h1>
          <p className="text-emerald-100 mt-2">
            Compare multiple encryption algorithms to see which performs best for your specific needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Input Data</CardTitle>
                <CardDescription className="text-emerald-100/70">
                  Enter text or upload a file to benchmark encryption algorithms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="text" onValueChange={(value) => setInputType(value as "text" | "file")}>
                  <TabsList className="mb-4 bg-white/10">
                    <TabsTrigger value="text" className="data-[state=active]:bg-emerald-600 text-white">
                      Text Input
                    </TabsTrigger>
                    <TabsTrigger value="file" className="data-[state=active]:bg-emerald-600 text-white">
                      File Upload
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="text">
                    <div className="space-y-2">
                      <Label htmlFor="input-text" className="text-white">
                        Enter text to encrypt
                      </Label>
                      <Textarea
                        id="input-text"
                        placeholder="Enter text here..."
                        className="min-h-32 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="file">
                    <div className="space-y-2">
                      <Label htmlFor="file-upload" className="text-white">
                        Upload a file
                      </Label>
                      <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-emerald-400" />
                        <p className="text-sm text-emerald-100/70 mb-2">
                          Drag and drop a file here, or click to select a file
                        </p>
                        <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById("file-upload")?.click()}
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          Select File
                        </Button>
                        {file && <p className="mt-2 text-sm text-emerald-400">Selected: {file.name}</p>}
                      </div>
                      <p className="text-xs text-emerald-100/70">Supported file types: .txt, .pdf, .docx (max 10MB)</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Select Algorithms</CardTitle>
                <CardDescription className="text-emerald-100/70">
                  Choose which encryption algorithms to benchmark
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="aes"
                      checked={selectedAlgorithms.aes}
                      onCheckedChange={(checked) => handleAlgorithmChange("aes", checked as boolean)}
                      className="border-white/20 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="aes" className="text-sm font-medium text-white">
                        AES
                      </Label>
                      <p className="text-xs text-emerald-100/70">Advanced Encryption Standard</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="des"
                      checked={selectedAlgorithms.des}
                      onCheckedChange={(checked) => handleAlgorithmChange("des", checked as boolean)}
                      className="border-white/20 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="des" className="text-sm font-medium text-white">
                        DES
                      </Label>
                      <p className="text-xs text-emerald-100/70">Data Encryption Standard</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="tripledes"
                      checked={selectedAlgorithms.tripledes}
                      onCheckedChange={(checked) => handleAlgorithmChange("tripledes", checked as boolean)}
                      className="border-white/20 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="tripledes" className="text-sm font-medium text-white">
                        Triple DES
                      </Label>
                      <p className="text-xs text-emerald-100/70">Triple Data Encryption</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="blowfish"
                      checked={selectedAlgorithms.blowfish}
                      onCheckedChange={(checked) => handleAlgorithmChange("blowfish", checked as boolean)}
                      className="border-white/20 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="blowfish" className="text-sm font-medium text-white">
                        Blowfish
                      </Label>
                      <p className="text-xs text-emerald-100/70">Symmetric block cipher</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="rsa"
                      checked={selectedAlgorithms.rsa}
                      onCheckedChange={(checked) => handleAlgorithmChange("rsa", checked as boolean)}
                      className="border-white/20 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="rsa" className="text-sm font-medium text-white">
                        RSA
                      </Label>
                      <p className="text-xs text-emerald-100/70">Rivest–Shamir–Adleman</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="ecc"
                      checked={selectedAlgorithms.ecc}
                      onCheckedChange={(checked) => handleAlgorithmChange("ecc", checked as boolean)}
                      className="border-white/20 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="ecc" className="text-sm font-medium text-white">
                        ECC
                      </Label>
                      <p className="text-xs text-emerald-100/70">Elliptic Curve Cryptography</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleRunBenchmark}
                  disabled={isLoading || (inputType === "text" && !inputText) || (inputType === "file" && !file)}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {isLoading ? "Running Benchmark..." : "Run Benchmark"}
                </Button>
              </CardFooter>
            </Card>

            {results && (
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Benchmark Results</CardTitle>
                  <CardDescription className="text-emerald-100/70">
                    Performance comparison of selected encryption algorithms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BenchmarkResults results={results} />
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4 text-white">Performance Visualization</h3>
                    <BenchmarkChart results={results} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    onClick={handleExportResults}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export Results as CSV
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Performance Metrics</CardTitle>
                <CardDescription className="text-emerald-100/70">
                  Understanding the benchmark parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-emerald-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white">Speed</h3>
                      <p className="text-sm text-emerald-100/70">
                        Time taken to encrypt/decrypt data, measured in milliseconds.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Database className="h-5 w-5 text-emerald-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white">Memory Usage</h3>
                      <p className="text-sm text-emerald-100/70">
                        Amount of memory consumed during encryption operations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Key className="h-5 w-5 text-emerald-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white">Key Size</h3>
                      <p className="text-sm text-emerald-100/70">
                        Size of the encryption key in bits. Larger keys generally provide stronger security.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-emerald-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white">Security Strength</h3>
                      <p className="text-sm text-emerald-100/70">
                        Relative measure of how secure the algorithm is against attacks.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-emerald-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white">Energy Consumption</h3>
                      <p className="text-sm text-emerald-100/70">
                        Estimated energy used during encryption, important for mobile/IoT devices.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-emerald-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white">Error Propagation</h3>
                      <p className="text-sm text-emerald-100/70">
                        How errors in encrypted data affect the decryption process.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <AlgorithmInfo />
          </div>
        </div>
      </div>
    </AnimatedBackground>
  )
}
