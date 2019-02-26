import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import doc from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof doc, 'function')
  },
  async 'calls package without error'() {
    await doc()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await doc({
      text: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T