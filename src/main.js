import './style.css'

const PRIMARY_PHONE_NUMBER = '07878895907'

function buildEnquiryBody(fields) {
  const lines = [
    'Prime Recycling Group – Enquiry',
    '',
    `Name: ${fields.name}`,
    `Business: ${fields.business}`,
    `Phone: ${fields.phone}`,
    `Location: ${fields.location}`,
    `Approx. volume: ${fields.volume}`,
    '',
    'Message:',
    fields.message,
  ]

  return lines.join('\n')
}

async function copyToClipboard(text) {
  if (!navigator.clipboard?.writeText) return false
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

function initEnquiryForm() {
  const form = document.querySelector('#enquiry-form')
  if (!(form instanceof HTMLFormElement)) return

  const statusEl = document.querySelector('#enquiry-status')

  const setStatus = (message) => {
    if (!(statusEl instanceof HTMLElement)) return
    statusEl.textContent = message
    statusEl.classList.remove('hidden')
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const getValue = (name) => {
      const el = form.elements.namedItem(name)
      if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement)) return ''
      return el.value.trim()
    }

    const fields = {
      name: getValue('name'),
      business: getValue('business'),
      phone: getValue('phone'),
      location: getValue('location'),
      volume: getValue('volume'),
      message: getValue('message'),
    }

    const body = buildEnquiryBody(fields)
    const copied = await copyToClipboard(body)

    const email = typeof form.dataset.email === 'string' ? form.dataset.email.trim() : ''
    const subject = 'Cardboard Collection Enquiry'
    const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    setStatus(
      copied
        ? `Details copied. Your email app will open now. If it doesn’t, paste the copied message into an email or call ${PRIMARY_PHONE_NUMBER}.`
        : `Your email app will open now. If it doesn’t, please call ${PRIMARY_PHONE_NUMBER}.`
    )

    window.location.href = mailto
  })
}

initEnquiryForm()
