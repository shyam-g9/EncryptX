import Link from "next/link"
import { ArrowLeft, Lock, Shield, Server } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="space-y-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-100 rounded-full mb-4">
            <Lock className="h-10 w-10 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">About EncryptX</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A powerful tool for analyzing and comparing encryption algorithms
          </p>
        </div>

        <section className="prose prose-emerald max-w-none">
          <h2>Our Mission</h2>
          <p>
            EncryptX was created to help developers, security professionals, and organizations make informed decisions
            about encryption technologies. We believe that understanding the performance characteristics and security
            implications of different encryption algorithms is essential for building secure systems.
          </p>

          <h2>How EncryptX Works</h2>
          <p>Our application provides two main functionalities:</p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="h-6 w-6 text-emerald-600 mt-1" />
                <h3 className="text-xl font-semibold">Benchmark Mode</h3>
              </div>
              <p className="text-gray-600">
                Compare multiple encryption algorithms across six key parameters: speed, memory usage, key size,
                security strength, energy consumption, and error propagation. This helps you identify the best algorithm
                for your specific use case.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <Lock className="h-6 w-6 text-emerald-600 mt-1" />
                <h3 className="text-xl font-semibold">Encrypt Data</h3>
              </div>
              <p className="text-gray-600">
                Securely encrypt your sensitive data using industry-standard algorithms. You can input text directly or
                upload files, and then download the encrypted result for secure storage or transmission.
              </p>
            </div>
          </div>

          <h2>Supported Encryption Algorithms</h2>
          <p>EncryptX supports a wide range of encryption algorithms, including:</p>

          <ul>
            <li>
              <strong>AES (Advanced Encryption Standard)</strong> - The current industry standard for symmetric
              encryption
            </li>
            <li>
              <strong>DES (Data Encryption Standard)</strong> - An older symmetric algorithm, now considered insecure
            </li>
            <li>
              <strong>Triple DES</strong> - A more secure variant of DES that applies the algorithm three times
            </li>
            <li>
              <strong>Blowfish</strong> - A fast block cipher designed as a replacement for DES
            </li>
            <li>
              <strong>RSA</strong> - A widely used asymmetric encryption algorithm
            </li>
            <li>
              <strong>ECC (Elliptic Curve Cryptography)</strong> - An efficient asymmetric approach using elliptic
              curves
            </li>
          </ul>

          <h2>Security Considerations</h2>
          <p>
            While EncryptX provides tools for encryption and analysis, it's important to remember that security is a
            complex field. We recommend consulting with security professionals when implementing encryption in
            production systems. Some key considerations:
          </p>

          <ul>
            <li>Always use strong, random encryption keys</li>
            <li>Implement proper key management practices</li>
            <li>Keep your encryption libraries and systems updated</li>
            <li>Consider the full security context, not just the encryption algorithm</li>
          </ul>

          <h2>Technology Stack</h2>
          <p>EncryptX is built using modern web technologies:</p>

          <div className="flex items-center gap-3 mb-2">
            <Server className="h-5 w-5 text-emerald-600" />
            <span className="font-medium">Frontend:</span>
            <span>React, Next.js, Tailwind CSS, shadcn/ui</span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <Server className="h-5 w-5 text-emerald-600" />
            <span className="font-medium">Backend:</span>
            <span>Node.js, Crypto libraries</span>
          </div>

          <div className="flex items-center gap-3">
            <Server className="h-5 w-5 text-emerald-600" />
            <span className="font-medium">Data Visualization:</span>
            <span>Canvas API</span>
          </div>
        </section>

        <div className="text-center pt-8 border-t">
          <h2 className="text-2xl font-bold mb-4">Ready to analyze encryption algorithms?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/benchmark">Start Benchmarking</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/encrypt">Encrypt Your Data</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
