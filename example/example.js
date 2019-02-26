/* yarn example/ */
import doc from '../src'

(async () => {
  const res = await doc({
    text: 'example',
  })
  console.log(res)
})()