// Certificate content verifier
// Extracts text from image (OCR) or PDF and checks for certificate keywords

// Keywords that must appear in a real certificate
const CERT_REQUIRED = [
  ['certificate', 'certification', 'certified', 'certify'],   // cert word
  ['completion', 'complete', 'completed', 'successfully'],     // completion word
  ['course', 'program', 'training', 'learning', 'module'],     // course word
]

// Keywords that strengthen the match (at least 1 needed)
const CERT_SUPPORTING = [
  'awarded', 'presented', 'congratulations', 'achievement',
  'udemy', 'coursera', 'edx', 'pluralsight', 'linkedin',
  'google', 'microsoft', 'amazon', 'aws', 'ibm',
  'hours', 'credential', 'verify', 'issued', 'date',
  'instructor', 'student', 'learner', 'graduate',
]

export async function extractTextFromCertificate(file) {
  const isPDF = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
  const isImage = file.type.startsWith('image/')

  if (isPDF) {
    return await extractFromPDF(file)
  } else if (isImage) {
    return await extractFromImage(file)
  }
  return ''
}

async function extractFromPDF(file) {
  try {
    const pdfjsLib = await import('pdfjs-dist')
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
    const buf = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: buf }).promise
    let text = ''
    for (let i = 1; i <= Math.min(pdf.numPages, 3); i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      text += content.items.map(item => item.str).join(' ') + ' '
    }
    return text.toLowerCase()
  } catch (err) {
    console.error('PDF cert extraction error:', err)
    return ''
  }
}

async function extractFromImage(file) {
  try {
    const { createWorker } = await import('tesseract.js')
    const worker = await createWorker('eng', 1, {
      workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/worker.min.js',
      langPath: 'https://tessdata.projectnaptha.com/4.0.0',
      corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@5/tesseract-core-simd-lstm.wasm.js',
      logger: () => {}, // suppress logs
    })
    const { data: { text } } = await worker.recognize(file)
    await worker.terminate()
    return text.toLowerCase()
  } catch (err) {
    console.error('OCR error:', err)
    return ''
  }
}

export function verifyCertificateContent(text, course) {
  if (!text || text.trim().length < 20) {
    return { valid: false, reason: 'no_text', message: 'Could not read any text from this file. Please upload a clear certificate image or PDF.' }
  }

  const lower = text.toLowerCase()

  // Check required keyword groups — at least 1 from each group must appear
  const missingGroups = CERT_REQUIRED.filter(group => !group.some(kw => lower.includes(kw)))
  if (missingGroups.length > 0) {
    return {
      valid: false,
      reason: 'missing_cert_keywords',
      message: `This doesn't look like a certificate. Missing required words like: ${missingGroups.map(g => `"${g[0]}"`).join(', ')}. Please upload your actual completion certificate.`,
    }
  }

  // Check supporting keywords — at least 1 must appear
  const hasSupporting = CERT_SUPPORTING.some(kw => lower.includes(kw))
  if (!hasSupporting) {
    return {
      valid: false,
      reason: 'missing_supporting',
      message: 'This file does not appear to be a course completion certificate. Please upload the certificate you received from the course platform.',
    }
  }

  // Check course relevance — provider OR skill OR title word must appear
  const courseWords = [
    course.provider.toLowerCase(),
    course.skill.toLowerCase(),
    ...course.title.toLowerCase().split(' ').filter(w => w.length > 4),
  ]
  const hasCourseMatch = courseWords.some(w => lower.includes(w))
  if (!hasCourseMatch) {
    return {
      valid: false,
      reason: 'wrong_course',
      message: `Certificate content doesn't match this course. Expected to find "${course.provider}" or "${course.skill}" in the certificate. Please upload the correct certificate for "${course.title}".`,
    }
  }

  return { valid: true, message: `Certificate verified for "${course.title}". Completion recorded.` }
}
