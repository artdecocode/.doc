import Footer from './footer'
export { Footer }

export const Sponsor = () => {
  return <table>
  <tr/>
  <tr>
    <td align="center">
      <a href="https://www.technation.sucks">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif" alt="Tech Nation Visa"/>
      </a><br/>
      Sponsored by <a href="https://www.technation.sucks">Tech Nation Visa Sucks</a>.
    </td>
  </tr>
</table>
}

export const IdioFooter = () => {
  return <Footer client="Idio"
    clientLink="https://idio.cc"
    clientLogo="https://avatars3.githubusercontent.com/u/40834161?s=100"/>
}

export const WroteFooter = () => {
  return <Footer client="Wrote"
    clientLink="https://wrote.cc"
    clientLogo="https://avatars3.githubusercontent.com/u/40831417?s=100"/>
}

export const ÀLaModeFooter = () => {
  return <Footer client="À La Mode"
    clientLink="https://alamode.cc" />
}

export const DepackFooter = () => {
  return <Footer client="Depack"
    clientLink="https://artd.eco/depack" />
}

export const ContextTestingFooter = () => {
  return (`
  (c) [Context Testing](https://contexttesting.com) ${new Date().getFullYear()}
`)
}

export { default as Render } from './Render'

export const Externs = ({ namespace }) => {
  return `The types and [externs](externs.js) for _Google Closure Compiler_ via [**_Depack_**](https:/`+`/github.com/dpck/depack) are defined in the \`${namespace}\` namespace.`
}

export const Goa = () => {
  return `The original module has been updated to be used in [\`@goa/koa\`](https:/`+`/artdecocode.com/goa/): _Koa_ web server compiled with _Google Closure Compiler_ using [**Depack**](https://artdecocode.com/depack/) into a single file library (0 dependencies).`
}

export default {
  footer: Footer,
  'idio-footer': IdioFooter,
  'wrote-footer': WroteFooter,
  'alamode-footer': IdioFooter,
  'depack-footer': DepackFooter,
  'context-testing-footer': ContextTestingFooter,
  'externs': Externs,
  'goa': Goa,
}
