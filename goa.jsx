import { readFileSync } from 'fs'
import { join } from 'path'

let _g
const Goa = () => {
  if (_g) return _g
  _g = readFileSync(join(__dirname, 'goa.md')).toString()
  return _g
}

export default ({ documentary, test }) => {
  documentary.setPretty(false)
  const g = '\n'+Goa()
  return (<table>
  <tr><td dangerouslySetInnerHTML={{__html: g}}>
  </td>
  <td>
    {'\n\n'}
    The tests were rewritten using [context testing](https://contexttesting.com). The [Http Context](https://npmjs.org/@contexts/http), in particular the Cookie Tester was used to assert on presence of entries, and their attributes.{'\n\n'}
  <details><summary>Show the tests.</summary>
{'\n\n'}
%EXAMPLE: {test}%{'\n'}
  </details>
  </td></tr>
</table>)
}


{/* <thead><tr><th>
  </th></tr></thead>
  <!-- block-start --> */}