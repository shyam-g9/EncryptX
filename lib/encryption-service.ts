// This is a simulated encryption service for demonstration purposes
// In a real application, you would use actual encryption libraries

// Browser-compatible timeout function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Simulated benchmark data for different algorithms
const algorithmData = {
  aes: {
    speed: 12, // milliseconds
    memory: 4.2, // MB
    keySize: 256, // bits
    securityStrength: 9.5, // scale of 1-10
    energyConsumption: 3.2, // relative units
    errorPropagation: 1.0, // relative units
  },
  des: {
    speed: 18,
    memory: 3.8,
    keySize: 56,
    securityStrength: 4.2,
    energyConsumption: 4.5,
    errorPropagation: 2.8,
  },
  tripledes: {
    speed: 35,
    memory: 5.6,
    keySize: 168,
    securityStrength: 7.8,
    energyConsumption: 6.7,
    errorPropagation: 2.5,
  },
  blowfish: {
    speed: 15,
    memory: 4.0,
    keySize: 448,
    securityStrength: 8.2,
    energyConsumption: 3.8,
    errorPropagation: 1.8,
  },
  rsa: {
    speed: 120,
    memory: 8.5,
    keySize: 2048,
    securityStrength: 9.0,
    energyConsumption: 9.2,
    errorPropagation: 4.5,
  },
  ecc: {
    speed: 45,
    memory: 6.2,
    keySize: 256,
    securityStrength: 9.8,
    energyConsumption: 5.4,
    errorPropagation: 3.2,
  },
}

// Simulated function to run benchmarks
export async function runBenchmark(algorithms: string[], inputData: string) {
  // Simulate processing time using our browser-compatible delay function
  await delay(1500)

  // Add some randomness to make it more realistic
  const randomFactor = () => 0.85 + Math.random() * 0.3 // Random between 0.85 and 1.15

  // Generate benchmark results
  return algorithms.map((algorithm) => {
    const baseData = algorithmData[algorithm as keyof typeof algorithmData]

    // Apply some randomness based on input data length
    const dataFactor = 1 + (inputData.length % 100) / 1000

    return {
      algorithm: algorithm.toUpperCase(),
      speed: Math.round(baseData.speed * randomFactor() * dataFactor * 10) / 10,
      memory: Math.round(baseData.memory * randomFactor() * 10) / 10,
      keySize: baseData.keySize,
      securityStrength: Math.round(baseData.securityStrength * randomFactor() * 10) / 10,
      energyConsumption: Math.round(baseData.energyConsumption * randomFactor() * 10) / 10,
      errorPropagation: Math.round(baseData.errorPropagation * randomFactor() * 10) / 10,
    }
  })
}

// Simulated function to encrypt data
export async function encryptData(algorithm: string, inputData: string) {
  // Simulate encryption time using our browser-compatible delay function
  await delay(800)

  // Generate a simulated encrypted string
  const encryptedData = simulateEncryption(algorithm, inputData)

  return {
    algorithm,
    encryptedData,
  }
}

// Simulated function to decrypt data
export async function decryptData(algorithm: string, cipherText: string) {
  // Simulate decryption time
  await delay(600)

  // Generate a simulated decrypted string
  const decryptedData = simulateDecryption(algorithm, cipherText)

  return {
    algorithm,
    decryptedData,
  }
}

// Helper function to simulate encryption
function simulateEncryption(algorithm: string, data: string) {
  // This is just a simulation - not actual encryption
  const prefix = algorithm.toUpperCase()
  const base64 = Buffer.from(data).toString("base64")

  // Add some random characters to make it look more like encrypted data
  const randomChars = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

  return `${prefix}_${randomChars}_${base64}`
}

// Helper function to simulate decryption
function simulateDecryption(algorithm: string, cipherText: string) {
  try {
    // Check if the cipherText follows our format
    const parts = cipherText.split("_")

    // If it has at least 3 parts and the first part matches the algorithm
    if (parts.length >= 3 && parts[0].toLowerCase() === algorithm.toUpperCase().toLowerCase()) {
      // The last part should be the base64 encoded data
      const base64Data = parts[parts.length - 1]

      try {
        // Try to decode the base64 data
        return Buffer.from(base64Data, "base64").toString("utf-8")
      } catch (e) {
        // If decoding fails, return a generic message
        return "Unable to decrypt data. The format may be incorrect."
      }
    } else {
      // For demo purposes, if the format doesn't match, we'll still try to extract something
      // In a real app, you would validate the format more strictly
      return "This appears to be encrypted with a different algorithm or format."
    }
  } catch (error) {
    return "Decryption failed. Please check the encrypted text and algorithm selection."
  }
}
