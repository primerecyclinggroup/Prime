import './style.css'

const PRIMARY_PHONE_NUMBER = '07878895907'
const RECIPIENT_EMAIL = 'primerecyclinggroup@gmail.com'

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

function initEnquiryForm() {
  const form = document.querySelector('#enquiry-form')
  if (!(form instanceof HTMLFormElement)) return

  const statusEl = document.querySelector('#enquiry-status')

  const setStatus = (message) => {
    if (!(statusEl instanceof HTMLElement)) return
    statusEl.textContent = message
    statusEl.classList.remove('hidden')
  }

  form.addEventListener('submit', (event) => {
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

    const emailFromDataset = typeof form.dataset.email === 'string' ? form.dataset.email.trim() : ''
    const email = emailFromDataset.length ? emailFromDataset : RECIPIENT_EMAIL
    const subject = 'Cardboard Collection Enquiry'
    const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    setStatus(
      `Your email app should open with the enquiry pre-filled. If it doesn’t, email ${email} or call ${PRIMARY_PHONE_NUMBER}.`
    )

    window.location.href = mailto
  })
}

initEnquiryForm()
