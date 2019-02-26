import { makeTestSuite } from 'zoroaster'
import Context from '../context'
import doc from '../../src'

const ts = makeTestSuite('test/result', {
  async getResults(input) {
    const res = await doc({
      text: input,
    })
    return res
  },
  context: Context,
})

// export default ts
