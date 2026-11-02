# [southwestruby.com](https://www.southwestruby.com)

Website of the South West Ruby group, based in Bristol, UK.

A Jekyll site. GitHub Actions builds it and publishes it to GitHub Pages on
every push to main (`.github/workflows/pages.yml`). The domain's DNS is in
Cloudflare: `www` is a CNAME to south-west-ruby.github.io, and the apex points
to GitHub Pages, which redirects it to `www`.

## Development

```
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.

## Photos page

`photos.html` lists the photos in `_data/photos.yml`, one section per
meetup: title, date, venue, talks, the Meetup event page, and for each photo
its size, alt text, Meetup caption and who posted it. The photos came from the
group's Meetup albums.

Each photo is in `assets/photos` twice, as WebP with metadata removed:
`thumbs/` (800 px on the longest side) for the page and the photo itself
(1800 px) for the viewer. To add a photo, make both sizes with
[libvips](https://www.libvips.org) and add an entry to `_data/photos.yml`
with the thumbnail's width and height:

```
vips thumbnail photo.jpg "assets/photos/thumbs/2024-07-09-03.webp[Q=76,strip]" 800 --height 800 --size down
vips thumbnail photo.jpg "assets/photos/2024-07-09-03.webp[Q=80,strip]" 1800 --height 1800 --size down
```

`assets/js/gallery.js` sets the photos in rows of equal height, and
`assets/js/lightbox.js` opens a photo in a viewer with its caption. Each
photo has a link of its own, for example `/photos/#2018-11-20-02`.

The font is Ubuntu Sans (`assets/fonts`, SIL Open Font License), the sans
serif companion to the Ubuntu Mono of the logo.
