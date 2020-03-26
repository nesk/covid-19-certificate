import 'bootstrap/dist/css/bootstrap.min.css'

import { PDFDocument, StandardFonts } from 'pdf-lib'
import QRCode from 'qrcode'

import pdfBase from './certificate.pdf'
import './main.css'

const $ = (...args) => document.querySelector(...args)
const $$ = (...args) => document.querySelectorAll(...args)

const generateQR = async text => {
  try {
    return await QRCode.toDataURL(text)
  } catch (err) {
    console.error(err)
  }
}

function saveProfile() {
  for (const field of $$('#form-profile input:not([disabled]):not([type=checkbox])')) {
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
  const datecreation = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
  const heurecreation = `${date.getHours()}h${String(date.getMinutes()).padStart(2, '0')}`
  const data = `Nom/Prenom: ${profile.name}; Date de naissance: ${profile.birthday}; Lieu de naissance: ${profile.lieunaissance}; Adresse: ${profile.address} ${profile.zipcode} ${profile.town}; Date sortie: ${profile.datesortie} a ${profile.heure.substring(0, 2)}h${profile.heure.substring(3, 5)}; Date creation: ${datecreation} à ${heurecreation}; Motif: ${reason}`;
  const existingPdfBytes = await fetch(pdfBase).then(res => res.arrayBuffer())
  
  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const page = pdfDoc.getPages()[0]
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const drawText = (text, x, y, size = 11) => {
    page.drawText(text, {x, y, size, font})
  }
  
  drawText(profile.name, 123, 686)
  drawText(profile.birthday, 123, 661)
  drawText(profile.lieunaissance, 92, 638)
  drawText(`${profile.address} ${profile.zipcode} ${profile.town}`, 134, 613)

  switch (reason) {
    case 'travail':
      drawText('x', 76, 527, 19)
      break
    case 'courses':
      drawText('x', 76, 478, 19)
      break
    case 'sante':
      drawText('x', 76, 436, 19)
      break
    case 'famille':
      drawText('x', 76, 400, 19)
      break
    case 'sport':
      drawText('x', 76, 345, 19)
      break
    case 'judiciaire':
      drawText('x', 76, 298, 19)
      break
    case 'missions':
      drawText('x', 76, 260, 19)
      break
  }
  let locationSize = idealFontSize(font, profile['done-at'] || profile.town, 83, 7, 11);

  if (!locationSize){
    alert('Le nom de la ville risque de ne pas être affiché correctement en raison de sa longueur. ' +
      'Essayez d\'utiliser des abréviations ("Saint" en "St." par exemple) quand cela est possible.');
    locationSize = 7;
  }

  drawText(profile['done-at'] || profile.town, 111, 226, locationSize)

  if (reason !== '') {
    // Date sortie
    drawText(`${profile.datesortie}`, 92, 200)
    drawText(`${profile.heure.substring(0, 2)}`, 200, 201)
    drawText(`${profile.heure.substring(3, 5)}`, 220, 201)
  }

  // Date création
  drawText(`Date de création:`, 434, 145)
  drawText(`${datecreation} à ${heurecreation}`, 428, 135)

  const generatedQR = await generateQR(data)
  
  const qrImage = await pdfDoc.embedPng(generatedQR)
  
  page.drawImage(qrImage, {
    x: page.getWidth() - 170,
    y: 155,
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
  document.body.appendChild(link)
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

$('#date-selector-sortie').addEventListener('change', ({ target }) => {
  $('#field-datesortie').value = target.value.split('-').reverse().join('/')
})

$('#check-same-town').addEventListener('change', applyDoneAt)
applyDoneAt()

$('#form-profile').addEventListener('submit', async event => {
  event.preventDefault()
  saveProfile()
  const reason = getAndSaveReason()
  const pdfBlob = await generatePdf(getProfile(), reason)
  downloadBlob(pdfBlob, 'attestation.pdf')
})
