/**
 * pdfUploader.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Handles:
 *  1. Client-side PDF validation (extension, MIME, magic bytes, size)
 *  2. Text extraction from PDF using pdfjs-dist (runs in browser)
 *  3. Resume content validation (must look like a real resume)
 *  4. Sending extracted text to the analysis API endpoint
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Constants ─────────────────────────────────────────────────────────────────
const MIN_SIZE_BYTES = 10_000       // 10 KB
const MAX_SIZE_BYTES = 10_485_760   // 10 MB
const MIN_TEXT_LENGTH = 100         // characters

// Resume must contain at least one keyword from each group
const RESUME_REQUIRED_GROUPS = [
  {
    name: 'Contact Info',
    keywords: ['email', 'phone', 'mobile', 'contact', 'gmail', 'linkedin', '@'],
  },
  {
    name: 'Education',
    keywords: ['education', 'university', 'college', 'degree', 'b.tech', 'b.e',
               'bsc', 'msc', 'mba', 'bachelor', 'master', 'school', 'graduation'],
  },
  {
    name: 'Skills',
    keywords: ['skills', 'technologies', 'tools', 'languages', 'frameworks',
               'proficient', 'expertise', 'technical'],
  },
  {
    name: 'Experience / Projects',
    keywords: ['experience', 'project', 'internship', 'work', 'employment',
               'developed', 'built', 'implemented', 'designed', 'worked'],
  },
]

// ── Step 1: Validate file before reading ─────────────────────────────────────
export async function validatePDFFile(file) {
  if (!file) {
    return { valid: false, error: 'No file provided.' }
  }

  // Extension check
  if (!file.name.toLowerCase().endsWith('.pdf')) {
    return { valid: false, error: 'File must have a .pdf extension. Please upload your resume as a PDF.' }
  }

  // MIME type check (some browsers report empty string — allow that)
  if (file.type && file.type !== 'application/pdf') {
    return { valid: false, error: `Invalid file type "${file.type}". Only PDF files are accepted.` }
  }

  // Size check
  if (file.size < MIN_SIZE_BYTES) {
    return { valid: false, error: `File is too small (${(file.size / 1024).toFixed(1)} KB). A valid resume is at least 10 KB.` }
  }
  if (file.size > MAX_SIZE_BYTES) {
    return { valid: false, error: `File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum allowed size is 10 MB.` }
  }

  // Magic bytes check — real PDFs start with %PDF (0x25 0x50 0x44 0x46)
  try {
    const buffer = await file.slice(0, 4).arrayBuffer()
    const bytes = new Uint8Array(buffer)
    const isPDF = bytes[0] === 0x25 && bytes[1] === 0x50 &&
                  bytes[2] === 0x44 && bytes[3] === 0x46
    if (!isPDF) {
      return {
        valid: false,
        error: 'This file does not appear to be a real PDF. Please upload the actual PDF version of your resume.',
      }
    }
  } catch {
    // If we can't read bytes, proceed — pdfjs will catch it later
  }

  return { valid: true }
}

// ── Step 2: Extract text from PDF ─────────────────────────────────────────────
export async function extractTextFromPDF(file) {
  try {
    const pdfjsLib = await import('pdfjs-dist')
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'

    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

    let fullText = ''
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      fullText += content.items.map(item => item.str).join(' ') + '\n'
    }

    return fullText.trim()
  } catch (err) {
    console.error('[pdfUploader] PDF extraction failed:', err)
    throw new Error('Could not read this PDF. Make sure it is a text-based PDF, not a scanned image.')
  }
}

// ── Step 3: Validate resume content ───────────────────────────────────────────
export function validateResumeContent(text) {
  if (!text || text.trim().length < MIN_TEXT_LENGTH) {
    return {
      valid: false,
      error: 'Could not extract readable text from this PDF. Your resume must be a text-based PDF (not a scanned image).',
    }
  }

  const lower = text.toLowerCase()

  const missingGroups = RESUME_REQUIRED_GROUPS.filter(
    group => !group.keywords.some(kw => lower.includes(kw))
  )

  if (missingGroups.length > 0) {
    const missing = missingGroups.map(g => g.name).join(', ')
    return {
      valid: false,
      error: `This does not look like a valid resume. Missing sections: ${missing}. Please upload your actual resume/CV.`,
    }
  }

  return { valid: true }
}

// ── Step 4: Full pipeline — validate + extract + content check ────────────────
export async function processResumeFile(file) {
  // 1. File validation
  const fileCheck = await validatePDFFile(file)
  if (!fileCheck.valid) return { success: false, error: fileCheck.error }

  // 2. Text extraction
  let text
  try {
    text = await extractTextFromPDF(file)
  } catch (err) {
    return { success: false, error: err.message }
  }

  // 3. Content validation
  const contentCheck = validateResumeContent(text)
  if (!contentCheck.valid) return { success: false, error: contentCheck.error }

  return { success: true, text }
}
