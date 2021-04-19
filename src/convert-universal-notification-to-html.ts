import { UniversalNotification } from 'universal-notification'
import { JSDOM } from 'jsdom'

const jsdom = new JSDOM()
const document = jsdom.window.document

export function convertUniversalNotificationToHTML(
  notification: UniversalNotification
): string {
  const container = document.createElement('div')

  if (notification.iconUrl) {
    container.append(paragraph(image(notification.iconUrl)))
  }

  if (notification.title) {
    container.append(paragraph(emphasis(notification.title)))
  }

  if (notification.message) {
    container.append(paragraph(text(notification.message)))
  }

  if (notification.url) {
    container.append(paragraph(link(notification.url)))
  }

  if (notification.imageUrl) {
    container.append(paragraph(image(notification.imageUrl)))
  }

  return container.innerHTML
}

function emphasis(text: string) {
  const title = document.createElement('em')
  title.style.fontWeight = 'bold'
  title.textContent = text
  return title
}

function text(text: string) {
  const message = document.createElement('span')
  message.textContent = text
  return message
}

function link(url: string, text: string = url) {
  const link = document.createElement('a')
  link.href = url
  link.text = text
  return link
}

function image(url: string) {
  const image = document.createElement('img')
  image.src = url
  return image
}

function paragraph(...children: HTMLElement[]) {
  const container = document.createElement('p')
  for (const child of children) {
    container.append(child)
  }
  return container
}
