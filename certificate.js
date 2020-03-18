const { PDFDocument, StandardFonts } = PDFLib

const $ = (...args) => document.querySelector(...args)
const $$ = (...args) => document.querySelectorAll(...args)
const signaturePad = new SignaturePad($('#field-signature'), { minWidth: 1, maxWidth: 3 })

function hasProfile() {
  return localStorage.getItem('name') !== null
}

function saveProfile() {
  for (field of $$('#form-profile input:not([disabled]):not([type=checkbox])')) {
    localStorage.setItem(field.id.substring('field-'.length), field.value)
  }

  localStorage.setItem('signature', signaturePad.toDataURL())
}

function getProfile() {
  const fields = {}
  for (let i = 0; i < localStorage.length; i++){
    const name = localStorage.key(i)
    fields[name] = localStorage.getItem(name)
  }
  return fields
}

async function generatePdf(profile, reason) {
  const url = 'certificate.pdf'
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const page = pdfDoc.getPages()[0]

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const drawText = (text, x, y, size = 11) => {
    page.drawText(text, {x, y, size, font})
  }

  drawText(profile.name, 135, 622)
  drawText(profile.birthday, 135, 593)
  drawText(profile.address, 135, 559)
  drawText(`${profile.zipcode} ${profile.town}`, 135, 544)

  switch (reason) {
    case 'work':
      drawText('x', 51, 425, 17)
      break
    case 'groceries':
      drawText('x', 51, 350, 17)
      break
    case 'health':
      drawText('x', 51, 305, 17)
      break
    case 'family':
      drawText('x', 51, 274, 17)
      break
    case 'sport':
      drawText('x', 51, 229, 17)
      break
  }

  drawText(profile['done-at'] || profile.town, 375, 140)
  drawText(String((new Date).getDate()), 478, 140)
  drawText(String((new Date).getMonth() + 1).padStart(2, '0'), 502, 140)

  const signatureArrayBuffer = await fetch(profile.signature).then(res => res.arrayBuffer())
  const signatureImage = await pdfDoc.embedPng(signatureArrayBuffer)
  const signatureDimensions = signatureImage.scale(1 / (signatureImage.width / 150))

  page.drawImage(signatureImage, {
    x: page.getWidth() - signatureDimensions.width - 100,
    y: 30,
    width: signatureDimensions.width,
    height: signatureDimensions.height,
  })

  const pdfBytes = await pdfDoc.save()
  return new Blob([pdfBytes], {type: 'application/pdf'})
}

function downloadBlob(blob, fileName) {
  const link = document.createElement('a')
  var url = URL.createObjectURL(blob)
  link.href = url
  link.download = fileName
  link.click()
}

function getAndSaveReason() {
  const {value} = $('input[name="field-reason"]:checked')
  localStorage.setItem('last-reason', value)
  return value
}

function restoreReason() {
  const value = localStorage.getItem('last-reason')
  if (value === null) {
    return
  }

  $(`#radio-${value}`).checked = true
}

function isIos() {
  return Boolean(navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform));
}

// see: https://stackoverflow.com/a/32348687/1513045
function isFacebookBrowser() {
  const ua = navigator.userAgent || navigator.vendor || window.opera
  return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1)
}

function applyDoneAt() {
  const { checked } = $('#check-same-town')
  $('#group-done-at').style.display = checked ? 'none' : 'block';
  $('#field-done-at').disabled = checked;
}

if (isFacebookBrowser()) {
  $('#alert-facebook').style.display = 'block';
}

if (hasProfile()) {
  $('#form-generate').style.display = 'block'
} else {
  $('#form-profile').style.display = 'block'
}

$('#form-profile').addEventListener('submit', event => {
  event.preventDefault()
  saveProfile()
  location.reload()
})

// We do not want to use a date field on Android, they're unusable, target only iOS devices.
if (isIos()) {
  $('#field-birthday').type = 'date'
}

$('#check-same-town').addEventListener('change', applyDoneAt)
applyDoneAt()

const formWidth = $('#form-profile').offsetWidth
$('#field-signature').width = formWidth
$('#field-signature').height = formWidth / 1.5

$('#reset-signature').addEventListener('click', () => signaturePad.clear())

$('#form-generate').addEventListener('submit', async event => {
  event.preventDefault()
  const reason = getAndSaveReason()
  const pdfBlob = await generatePdf(getProfile(), reason)
  downloadBlob(pdfBlob, 'attestation.pdf')
})

restoreReason()

//service worker registration
if ('serviceWorker' in navigator) {

  navigator.serviceWorker.register('service-worker.js')
    .then(function(reg){

    });
}

