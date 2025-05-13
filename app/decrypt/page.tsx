"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Unlock, ArrowLeft, Copy, Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { decryptData } from "@/lib/encryption-service"
import { AlgorithmInfo } from "@/components/algorithm-info"

export default function DecryptPage() {
  const router = useRouter()
  const [cipherText, setCipherText] = useState("")
  const [algorithm, setAlgorithm] = useState("aes")
  const [isLoading, setIsLoading] = useState(false)
  const [decryptedResult, setDecryptedResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleDecrypt = async () => {
    setIsLoading(true)
    try {
      // Decrypt the data
      const result = await decryptData(algorithm, cipherText)
      setDecryptedResult(result.decryptedData)
    } catch (error) {
      console.error("Decryption error:", error)
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyToClipboard = () => {
    if (decryptedResult) {
      navigator.clipboard.writeText(decryptedResult)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Unlock className="h-8 w-8 text-emerald-600" />
          Decrypt Data
        </h1>
        <p className="text-gray-600 mt-2">Decrypt your encrypted data back to its original form</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Input Encrypted Data</CardTitle>
              <CardDescription>Paste the encrypted text you want to decrypt</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="cipher-text">Enter encrypted text</Label>
                <Textarea
                  id="cipher-text"
                  placeholder="Paste encrypted text here..."
                  className="min-h-32 font-mono text-sm"
                  value={cipherText}
                  onChange={(e) => setCipherText(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Paste the full encrypted text, including any prefixes or identifiers
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Decryption Settings</CardTitle>
              <CardDescription>Select the algorithm used for encryption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="algorithm">Select Algorithm</Label>
                  <Select value={algorithm} onValueChange={setAlgorithm}>
                    <SelectTrigger id="algorithm">
                      <SelectValue placeholder="Select algorithm" />
                    </SelectTrigger>
                    <SelectContent>
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
                onClick={handleDecrypt}
                disabled={isLoading || !cipherText}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {isLoading ? "Decrypting..." : "Decrypt Data"}
              </Button>
            </CardFooter>
          </Card>

          {decryptedResult && (
            <Card>
              <CardHeader>
                <CardTitle>Decryption Result</CardTitle>
                <CardDescription>Your data has been decrypted using {algorithm.toUpperCase()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-md overflow-x-auto">
                    <pre className="text-sm text-black whitespace-pre-wrap">{decryptedResult}</pre>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={handleCopyToClipboard}>
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
              </CardFooter>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About Decryption</CardTitle>
              <CardDescription>Understanding data decryption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <p>
                  <strong>Decryption</strong> is the process of converting encrypted information back into its original
                  form.
                </p>
                <p>
                  To successfully decrypt data, you need to use the same algorithm that was used for encryption, along
                  with the correct decryption key.
                </p>
                <p>
                  For demonstration purposes, this app can decrypt data that was encrypted using our Encrypt Data
                  feature. In a real-world scenario, you would need the appropriate decryption keys.
                </p>
              </div>
            </CardContent>
          </Card>

          <AlgorithmInfo />
        </div>
      </div>
    </div>
  )
}
