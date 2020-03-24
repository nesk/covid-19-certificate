const { PDFDocument, StandardFonts } = PDFLib

const $ = (...args) => document.querySelector(...args)
const $$ = (...args) => document.querySelectorAll(...args)

const generateQR = async text => {
  try {
    return await QRCode.toDataURL(text)
  } catch (err) {
    console.error(err)
  }
}

function hasProfile() {
  return localStorage.getItem('name') !== null
}

function saveProfile() {
  for (field of $$('#form-profile input:not([disabled]):not([type=checkbox])')) {
    localStorage.setItem(field.id.substring('field-'.length), field.value)
  }

}

function getProfile() {
  const fields = {}
  for (let i = 0; i < localStorage.length; i++){
    const name = localStorage.key(i)
    fields[name] = localStorage.getItem(name)
  }
  return fields
}

function idealFontSize(font, text, maxWidth, minSize, defaultSize){
  let currentSize = defaultSize;
  let textWidth = font.widthOfTextAtSize(text, defaultSize);

  while (textWidth > maxWidth && currentSize > minSize){
    textWidth = font.widthOfTextAtSize(text, --currentSize);
  }

  return (textWidth > maxWidth) ? null : currentSize;
}

async function generatePdf(profile, reason) {
  const date = new Date()
  const data = "Nom/Prénom: "+profile.name+" ; Date de naissance: "+profile.birthday+" ; lieu : "+profile.address+" "+profile.zipcode+" "+profile.town+" ; Heure : "+ profile.heure + " ; Motif: " + reason;
  const url = '/covid-19-certificate/certificate.pdf'
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
    case 'travail':
      drawText('x', 51, 425, 17)
      break
    case 'courses':
      drawText('x', 51, 350, 17)
      break
    case 'sante':
      drawText('x', 51, 305, 17)
      break
    case 'famille':
      drawText('x', 51, 274, 17)
      break
    case 'sport':
      drawText('x', 51, 229, 17)
      break
  }

  let locationSize = idealFontSize(font, profile['done-at'] || profile.town, 83, 7, 11);

  if (!locationSize){
    alert('Le nom de la ville risque de ne pas être affiché correctement en raison de sa longueur. ' +
      'Essayez d\'utiliser des abréviations ("Saint" en "St." par exemple) quand cela est possible.');
    locationSize = 7;
  }

  drawText(profile['done-at'] || profile.town, 375, 140, locationSize)

  if (reason !== '') {
    drawText(String(date.getDate()).padStart(2, '0'), 478, 140)
    drawText(String(date.getMonth() + 1).padStart(2, '0'), 502, 140)
    drawText(profile.heure, 478, 123)
  }

  const generatedQR = await generateQR(data)
  const qrImage = await pdfDoc.embedPng(generatedQR)

  page.drawImage(qrImage, {
    x: page.getWidth() - 400,
    y: 30,
    width: 100,
    height: 100,
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

$('#date-selector').addEventListener('change', ({ target }) => {
  $('#field-birthday').value = target.value.split('-').reverse().join('/')
})

$('#check-same-town').addEventListener('change', applyDoneAt)
applyDoneAt()

const formWidth = $('#form-profile').offsetWidth

$('#form-profile').addEventListener('submit', async event => {
  event.preventDefault()
  saveProfile()
  const reason = getAndSaveReason()
  const pdfBlob = await generatePdf(getProfile(), reason)
  downloadBlob(pdfBlob, 'attestation.pdf')
})
