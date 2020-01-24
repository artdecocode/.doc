import { dirname } from 'path'
import idio from '@idio/idio'
import render from '@depack/render'
import CDP from 'chrome-remote-interface'
import { write, ensurePath } from '@wrote/wrote'

const Render = async ({ src, frontend = '', children, to }) => {
  const dir = dirname(src)
  const d = [dir, ...frontend.split(',')]
  const html = `import { render, h } from '/node_modules/preact/dist/preact.mjs'
`+`import Comp from './${src}'
render(h(Comp), document.body)`
  const { url, app, router } = await idio({
    frontend: {
      use: true,
      directory: d,
    },
  })
  router.get('/main.js', (ctx) => {
    ctx.type = 'application/javascript'
    ctx.body = html
  })
  router.get('/', (ctx) => {
    ctx.body = render(<html>
      <head dangerouslySetInnerHTML={{__html: children}}></head>
      <body>
        <script type="module" src="/main.js"></script>
      </body>
    </html>, {
      addDoctype: true,
    })
  })
  app.use(router.routes())
  let client
  try {
    client = await CDP({
      host: '127.0.0.1', //
      port: '9222',
    })
    const { Page, Runtime } = client
    await Page.enable()
    await Page.navigate({ url })
    await Page.loadEventFired()
    const rect = await Runtime.evaluate({ expression: 'JSON.stringify(document.body.getBoundingClientRect())' })
    // console.log(url)
    // await new Promise(r => setTimeout(r, 100000000))
    let { result: { value = {} }, exceptionDetails } = rect
    if (value) value = JSON.parse(value)
    const res = await Page.captureScreenshot({
      clip: { ...value, scale: 1 },
    })
    if (to) {
      const d = new Buffer(res.data, 'base64')
      await write(to, d)
      return (<table>
        <tr><td>
        <img src={to}/></td></tr>
      </table>)
    }
  } finally {
    await Promise.all([
      client && await client.close(),
      await app.destroy(),
    ])
  }
}

export const screenshot = async ({ url, to, alt, link, window }) => {
  let client
  try {
    client = await CDP({
      host: '127.0.0.1', //
      port: '9222',
    })
    const { Page, Runtime } = client
    await Page.enable()
    await Page.navigate({ url })
    await Page.loadEventFired()
    let clip
    if (!window) {
      const rect = await Runtime.evaluate({ expression: 'JSON.stringify(document.body.getBoundingClientRect())' })
      let { result: { value = {} }, exceptionDetails } = rect
      if (value) clip = JSON.parse(value)
    }

    const res = await Page.captureScreenshot({
      ...(clip ? { clip: { ...clip, scale: 1 } } : {}),
    })
    if (!alt) {
      alt = await Runtime.evaluate({
        expression: "document.querySelector('title').textContent",
        returnByValue: true,
      })
      alt = alt.result.value
    }
    if (to) {
      const d = new Buffer(res.data, 'base64')
      await ensurePath(to)
      await write(to, d)
      return (<table>
        <thead>
          <tr><th>
            <a href={link}>{alt}</a>
          </th></tr>
        </thead>
        <tr><td>
          <a href={link}><img alt={alt} src={to}/></a>
        </td></tr>
      </table>)
    }
  } finally {
    await Promise.all([
      client && await client.close(),
    ])
  }
}

export default Render