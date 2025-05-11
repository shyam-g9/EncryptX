import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function AlgorithmInfo() {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Algorithm Information</CardTitle>
        <CardDescription className="text-emerald-100/70">Learn about different encryption algorithms</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="aes" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-emerald-300">
              AES (Advanced Encryption Standard)
            </AccordionTrigger>
            <AccordionContent className="text-emerald-100/80">
              <div className="space-y-2 text-sm">
                <p>AES is a symmetric encryption algorithm adopted by the U.S. government and widely used worldwide.</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Key sizes: 128, 192, or 256 bits</li>
                  <li>Block size: 128 bits</li>
                  <li>Very fast in both software and hardware</li>
                  <li>Excellent security with no practical attacks</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="des" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-emerald-300">
              DES (Data Encryption Standard)
            </AccordionTrigger>
            <AccordionContent className="text-emerald-100/80">
              <div className="space-y-2 text-sm">
                <p>
                  DES is an older symmetric encryption algorithm that was once the federal standard but is now
                  considered insecure.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Key size: 56 bits (effectively)</li>
                  <li>Block size: 64 bits</li>
                  <li>Fast but vulnerable to brute force attacks</li>
                  <li>Not recommended for securing sensitive data</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="tripledes" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-emerald-300">Triple DES</AccordionTrigger>
            <AccordionContent className="text-emerald-100/80">
              <div className="space-y-2 text-sm">
                <p>
                  Triple DES applies the DES algorithm three times to each data block, providing more security than
                  standard DES.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Key size: 168 bits (effective key strength of 112 bits)</li>
                  <li>Block size: 64 bits</li>
                  <li>Slower than AES but more secure than DES</li>
                  <li>Still used in legacy systems but being phased out</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="blowfish" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-emerald-300">Blowfish</AccordionTrigger>
            <AccordionContent className="text-emerald-100/80">
              <div className="space-y-2 text-sm">
                <p>Blowfish is a symmetric block cipher designed as a fast, free alternative to DES.</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Key size: 32 to 448 bits</li>
                  <li>Block size: 64 bits</li>
                  <li>Very fast on 32-bit processors</li>
                  <li>No significant cryptanalytic attacks found</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rsa" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-emerald-300">RSA</AccordionTrigger>
            <AccordionContent className="text-emerald-100/80">
              <div className="space-y-2 text-sm">
                <p>
                  RSA is an asymmetric encryption algorithm widely used for secure data transmission and digital
                  signatures.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Key size: 1024 to 4096 bits (2048+ recommended)</li>
                  <li>Slower than symmetric algorithms</li>
                  <li>Uses different keys for encryption and decryption</li>
                  <li>Commonly used for key exchange and digital signatures</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ecc" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-emerald-300">
              ECC (Elliptic Curve Cryptography)
            </AccordionTrigger>
            <AccordionContent className="text-emerald-100/80">
              <div className="space-y-2 text-sm">
                <p>ECC is an asymmetric encryption approach based on elliptic curves over finite fields.</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Key size: 256 to 521 bits</li>
                  <li>Smaller keys than RSA for equivalent security</li>
                  <li>More efficient than RSA, especially on mobile devices</li>
                  <li>Used in TLS, SSH, and cryptocurrency systems</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
