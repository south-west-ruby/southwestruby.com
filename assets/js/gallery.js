// Lays out each gallery in justified rows: every row fills the gallery's width
// at the height closest to --row. A last row that does not fill the width keeps
// the --row height, or in a gallery of one row grows to at most GROWTH times
// --row. Without JavaScript, the flexbox rules in style.scss lay out the rows.
const GROWTH = 1.6

function layout(gallery) {
  const style = getComputedStyle(gallery)
  const target = parseFloat(style.getPropertyValue("--row"))
  const gap = parseFloat(style.columnGap) || 0
  const width = gallery.clientWidth
  const photos = [ ...gallery.children ].map(item => ({
    item,
    ratio: item.style.getPropertyValue("--w") / item.style.getPropertyValue("--h")
  }))

  const fill = row => (width - gap * (row.length - 1)) / row.reduce((sum, photo) => sum + photo.ratio, 0)
  const rows = []
  let row = []

  for (const photo of photos) {
    row.push(photo)
    if (fill(row) > target) continue

    // Move the last photo to the next row if that brings this row closer to the target height.
    const shorter = row.slice(0, -1)
    if (shorter.length && fill(shorter) - target < target - fill(row)) {
      rows.push({ photos: shorter, height: fill(shorter), full: true })
      row = [ photo ]
      if (fill(row) > target) continue
    }
    rows.push({ photos: row, height: fill(row), full: true })
    row = []
  }

  if (row.length) {
    const height = Math.min(fill(row), rows.length ? target : target * GROWTH)
    rows.push({ photos: row, height, full: height === fill(row) })
  }

  for (const { photos, height, full } of rows) {
    photos.forEach(({ item, ratio }, i) => {
      const grow = full && i === photos.length - 1 ? 1 : 0
      item.style.flex = `${grow} 0 ${Math.floor(ratio * height)}px`
      item.style.height = `${Math.round(height)}px`
    })
  }
  gallery.classList.add("gallery--justified")
}

const widths = new WeakMap()
const observer = new ResizeObserver(entries => {
  for (const { target } of entries) {
    if (widths.get(target) === target.clientWidth) continue
    widths.set(target, target.clientWidth)
    layout(target)
  }
})

document.querySelectorAll(".gallery").forEach(gallery => observer.observe(gallery))
