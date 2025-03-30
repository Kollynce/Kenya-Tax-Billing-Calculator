import html2pdf from 'html2pdf.js'

export async function exportToPDF(element, filename, options = {}) {
  const defaultOptions = {
    margin: [10, 10],
    filename: filename || 'document.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }

  const mergedOptions = { ...defaultOptions, ...options }
  
  try {
    const pdf = await html2pdf().set(mergedOptions).from(element).save()
    return pdf
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
}