"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, Upload, ArrowLeft, Download, Copy, Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { encryptData } from "@/lib/encryption-service"
import { AlgorithmInfo } from "@/components/algorithm-info"
import { AnimatedBackground } from "@/components/animated-background"

export default function EncryptPage() {
  const router = useRouter()
  const [inputType, setInputType] = useState<"text" | "file">("text")
  const [inputText, setInputText] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [algorithm, setAlgorithm] = useState("aes")
  const [isLoading, setIsLoading] = useState(false)
  const [encryptedResult, setEncryptedResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

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

  const handleEncrypt = async () => {
    setIsLoading(true)
    try {
      // Get the input data - always use the inputText which now contains file content if a file was selected
      const inputData = inputText

      // Encrypt the data
      const result = await encryptData(algorithm, inputData)
      setEncryptedResult(result.encryptedData)
    } catch (error) {
      console.error("Encryption error:", error)
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyToClipboard = () => {
    if (encryptedResult) {
      navigator.clipboard.writeText(encryptedResult)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    if (!encryptedResult) return

    // Create a blob and download
    const blob = new Blob([encryptedResult], { type: "application/octet-stream" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `encrypted-data-${algorithm}.bin`
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
            <Lock className="h-8 w-8 text-emerald-400" />
            Encrypt Data
          </h1>
          <p className="text-emerald-100 mt-2">Securely encrypt your data using industry-standard algorithms</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Input Data</CardTitle>
                <CardDescription className="text-emerald-100/70">
                  Enter text or upload a file to encrypt
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
                <CardTitle className="text-white">Encryption Settings</CardTitle>
                <CardDescription className="text-emerald-100/70">
                  Choose the encryption algorithm and parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="algorithm" className="text-white">
                      Select Algorithm
                    </Label>
                    <Select value={algorithm} onValueChange={setAlgorithm}>
                      <SelectTrigger id="algorithm" className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select algorithm" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/20">
                        <SelectItem value="aes">AES (Advanced Encryption Standard)</SelectItem>
                        <SelectItem value="des">DES (Data Encryption Standard)</SelectItem>
                        <SelectItem value="tripledes">Triple DES</SelectItem>
                        <SelectItem value="blowfish">Blowfish</SelectItem>
                        <SelectItem value="rsa">RSA</SelectItem>
                        <SelectItem value="ecc">ECC (Elliptic Curve Cryptography)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleEncrypt}
                  disabled={isLoading || (inputType === "text" && !inputText) || (inputType === "file" && !file)}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {isLoading ? "Encrypting..." : "Encrypt Data"}
                </Button>
              </CardFooter>
            </Card>

            {encryptedResult && (
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Encryption Result</CardTitle>
                  <CardDescription className="text-emerald-100/70">
                    Your data has been encrypted using {algorithm.toUpperCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-md overflow-x-auto">
                      <pre className="text-sm text-black font-mono">{encryptedResult}</pre>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={handleCopyToClipboard}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy to Clipboard
                      </>
                    )}
                  </Button>
                  <Button onClick={handleDownload} className="bg-emerald-600 hover:bg-emerald-700">
                    <Download className="mr-2 h-4 w-4" />
                    Download Encrypted File
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">About Encryption</CardTitle>
                <CardDescription className="text-emerald-100/70">Understanding data encryption</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-emerald-100/80">
                  <p>
                    <strong className="text-white">Encryption</strong> is the process of converting information into a
                    code to prevent unauthorized access.
                  </p>
                  <p>
                    When you encrypt data, it becomes unreadable without the correct decryption key, ensuring your
                    information remains secure.
                  </p>
                  <p>
                    Different encryption algorithms offer varying levels of security, speed, and resource usage. Choose
                    the one that best fits your needs.
                  </p>
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
