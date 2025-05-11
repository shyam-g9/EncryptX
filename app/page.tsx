import type React from "react"
import Link from "next/link"
import { ArrowRight, Lock, BarChart2, Unlock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedBackground } from "@/components/animated-background"

export default function Home() {
  return (
    <AnimatedBackground>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Lock className="h-6 w-6 text-emerald-400" />
              <h1 className="text-2xl font-bold text-white">EncryptX</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="font-medium text-white hover:text-emerald-300 transition">
                Home
              </Link>
              <Link href="/benchmark" className="font-medium text-white/80 hover:text-emerald-300 transition">
                Benchmark
              </Link>
              <Link href="/encrypt" className="font-medium text-white/80 hover:text-emerald-300 transition">
                Encrypt
              </Link>
              <Link href="/decrypt" className="font-medium text-white/80 hover:text-emerald-300 transition">
                Decrypt
              </Link>
            </nav>
            <Button variant="outline" size="sm" className="hidden md:flex border-white/20 text-white hover:bg-white/10">
              Documentation
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                  Compare Encryption Algorithms in Real Time
                </h1>
                <p className="text-lg text-emerald-100">
                  Analyze and benchmark different encryption algorithms based on speed, memory usage, security strength,
                  and more. Make informed decisions for your security needs.
                </p>
                <div className="flex gap-4 pt-4">
                  <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                    <Link href="/benchmark">
                      Start Benchmarking
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                    <Link href="/encrypt">Encrypt Data</Link>
                  </Button>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-full max-w-md aspect-square">
                  <div className="absolute inset-0 bg-emerald-400/20 rounded-full"></div>
                  <div className="absolute inset-4 bg-emerald-400/30 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="h-24 w-24 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-black/30 backdrop-blur-sm">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<BarChart2 className="h-10 w-10 text-emerald-400" />}
                title="Benchmark Mode"
                description="Compare multiple encryption algorithms to find which performs best for your specific needs."
              />
              <FeatureCard
                icon={<Lock className="h-10 w-10 text-emerald-400" />}
                title="Encrypt Data"
                description="Securely encrypt your sensitive data using industry-standard algorithms and download the results."
              />
              <FeatureCard
                icon={<Unlock className="h-10 w-10 text-emerald-400" />}
                title="Decrypt Data"
                description="Easily decrypt your encrypted data back to its original form with the same security standards."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <StepCard
                number="1"
                title="Select Mode"
                description="Choose between Benchmark Mode to compare algorithms, Encrypt Data to secure your information, or Decrypt Data to recover it."
              />
              <StepCard
                number="2"
                title="Input Data"
                description="Enter text directly or upload files for encryption, benchmarking, or paste encrypted text for decryption."
              />
              <StepCard
                number="3"
                title="View Results"
                description="Get detailed performance metrics, download your encrypted data, or view your decrypted information."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-emerald-900/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Test Encryption Algorithms?</h2>
            <p className="text-lg mb-8 text-emerald-100">
              Start analyzing encryption performance and make data-driven security decisions today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/benchmark">Start Benchmarking</Link>
              </Button>
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/encrypt">Encrypt Your Data</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Link href="/decrypt">Decrypt Your Data</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t border-white/10 py-8 px-4 bg-black/30 backdrop-blur-sm">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <Lock className="h-5 w-5 text-emerald-400" />
                <span className="font-bold text-white">EncryptX</span>
              </div>
              <div className="flex gap-6">
                <Link href="/" className="text-sm text-white/80 hover:text-white">
                  Home
                </Link>
                <Link href="/benchmark" className="text-sm text-white/80 hover:text-white">
                  Benchmark
                </Link>
                <Link href="/encrypt" className="text-sm text-white/80 hover:text-white">
                  Encrypt
                </Link>
                <Link href="/decrypt" className="text-sm text-white/80 hover:text-white">
                  Decrypt
                </Link>
              </div>
              <div className="mt-4 md:mt-0 text-sm text-white/60">© 2025 EncryptX. All rights reserved.</div>
            </div>
          </div>
        </footer>
      </div>
    </AnimatedBackground>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-emerald-400/30 transition-all hover:bg-white/10">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-emerald-100/80">{description}</p>
    </div>
  )
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-emerald-400/30 transition-all hover:bg-white/10">
      <div className="w-10 h-10 rounded-full bg-emerald-900/50 text-emerald-400 flex items-center justify-center font-bold text-lg mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-emerald-100/80">{description}</p>
    </div>
  )
}
