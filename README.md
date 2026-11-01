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
