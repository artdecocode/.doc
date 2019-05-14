import { dirname } from 'path'
import core from '@idio/core'
import render from '@depack/render'
import CDP from 'chrome-remote-interface'
import wrote from '@wrote/write'

const Render = async ({ src, frontend = '', children, to }) => {
  const dir = dirname(src)
  const d = [dir, ...frontend.split(',')]
  const html = `import { render, h } from '/node_modules/preact/dist/preact.mjs'
`+`import Comp from './${src}'
render(h(Comp), document.body)`
  const { url, app } = await core({
    frontend: {
      directory: d,
    },
    async js(ctx, next) {
      if (ctx.path != '/main.js') return await next()
      ctx.type = 'application/javascript'
      ctx.body = html
    },
    async serve(ctx) {
      ctx.body = render(<html>
        <head dangerouslySetInnerHTML={{__html: children}}></head>
        <body>
          <script type="module" src="/main.js"></script>
        </body>
      </html>, {
        addDoctype: true,
      })
    }
  }, { port: null })
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
      await wrote(to, d)
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

export default Render