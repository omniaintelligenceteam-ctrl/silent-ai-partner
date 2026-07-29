# Chase Motorsports × OIOS pitch deck — generator source

Regenerate the deck (e.g. for v2 with Dylan's real numbers filled in):

```bash
npm install pptxgenjs react-icons react react-dom sharp
node icons.js      # renders the icon PNGs into ./icons/
node deck.js       # -> chase-motorsports-oios-pitch.pptx
node onepager.js   # -> onepager.pptx (convert to PDF via LibreOffice)
```

All bracketed figures (`[ x / mo ]` etc.) are intentional fill-in-the-blank
placeholders — slide 18 (internal, do not present) lists the discovery
questions whose answers replace them in v2.
