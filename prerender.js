// Runs after the client and SSR builds: renders <App /> to HTML and injects it
// into dist/index.html so the content is visible without JavaScript.
import { readFileSync, writeFileSync } from 'node:fs'
import { render } from './dist-ssr/entry-server.js'

const file = 'dist/index.html'
const template = readFileSync(file, 'utf8')
const placeholder = '<!--app-html-->'

if (!template.includes(placeholder)) {
  throw new Error(`${file} is missing the ${placeholder} placeholder`)
}

writeFileSync(file, template.replace(placeholder, render()))
console.log(`Pre-rendered ${file}`)
