// Opens the photos page's thumbnails in a full-screen viewer with captions.
// Without JavaScript each thumbnail links to the large image.
const dialog = document.querySelector(".lightbox")
const links = [ ...document.querySelectorAll(".gallery a") ]
const stage = dialog.querySelector(".lightbox__stage")
const part = name => dialog.querySelector(`.lightbox__${name}`)
let index = -1

function setText(element, text) {
  element.textContent = text || ""
  element.hidden = !text
}

function show(i) {
  index = i
  const link = links[index]
  const thumb = link.querySelector("img")
  const event = link.closest(".event")
  const siblings = [ ...event.querySelectorAll(".gallery a") ]

  const image = document.createElement("img")
  image.className = "lightbox__image"
  image.alt = thumb.alt
  image.width = link.dataset.width
  image.height = link.dataset.height
  image.style.backgroundImage = `url("${thumb.currentSrc || thumb.src}")`
  image.addEventListener("load", () => image.style.backgroundImage = "", { once: true })
  image.src = link.href
  part("image").replaceWith(image)

  setText(part("count"), `${siblings.indexOf(link) + 1} of ${siblings.length}`)
  setText(part("text"), link.dataset.caption)
  setText(part("talk"), link.dataset.talk)
  setText(part("context"), `${link.dataset.context || event.dataset.context}.`)
  setText(part("by"), `Posted to Meetup by ${link.dataset.by}.`)
  part("meetup").hidden = !event.dataset.meetup
  part("meetup").href = event.dataset.meetup || ""

  dialog.querySelector("[data-action=previous]").ariaDisabled = index === 0
  dialog.querySelector("[data-action=next]").ariaDisabled = index === links.length - 1

  for (const neighbour of [ links[index - 1], links[index + 1] ]) {
    if (neighbour) new Image().src = neighbour.href
  }

  history.replaceState(null, "", `#${link.id}`)
}

function open(i) {
  show(i)
  if (!dialog.open) dialog.showModal()
}

function step(by) {
  const next = index + by
  if (next >= 0 && next < links.length) show(next)
}

links.forEach((link, i) => {
  link.addEventListener("click", event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    open(i)
  })
})

dialog.addEventListener("click", event => {
  const action = event.target.closest("[data-action]")?.dataset.action
  if (action === "close" || event.target === stage) dialog.close()
  if (action === "previous") step(-1)
  if (action === "next") step(1)
})

dialog.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft") step(-1)
  if (event.key === "ArrowRight") step(1)
})

dialog.addEventListener("close", () => {
  history.replaceState(null, "", location.pathname + location.search)
  links[index].focus()
})

let swipeStart = null
stage.addEventListener("pointerdown", event => {
  if (event.pointerType !== "mouse") swipeStart = { x: event.clientX, y: event.clientY }
})
stage.addEventListener("pointerup", event => {
  if (!swipeStart) return
  const dx = event.clientX - swipeStart.x
  const dy = event.clientY - swipeStart.y
  swipeStart = null
  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1)
})

function openLinked() {
  const linked = links.findIndex(link => `#${link.id}` === location.hash)
  if (linked >= 0) open(linked)
}

addEventListener("hashchange", openLinked)
openLinked()
