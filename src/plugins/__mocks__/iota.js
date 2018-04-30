import IOTA from 'iota.lib.js'
import curl from 'curl.lib.js'

const iota = new IOTA({
  'provider': 'http://node05.iotatoken.nl:16265'
})

const responseJson = {
  "fileName": "test_file",
  "content": "test_content"
}

iota.api.attachToTangle = jest.fn()
iota.api.findTransactionObjects = jest.fn().mockImplementation((bundle, callback) => {
  return callback(null, 'success')
})
iota.utils.extractJson = jest.fn().mockImplementation(() => JSON.stringify(responseJson))

export const MESSAGE_LENGTH = 2186
// export const SEED = 'YSHKGJSNDZPDMLUSFGOSRVN9AYEJLFCNXLZLGKPVNBGHQWTQYZBSMVPUYLPGJOWYPIMQQVTGQHPHLMEGD'
export const MWM = 14
export const DEPTH = 2 
const MAX_TIMESTAMP_VALUE = (Math.pow(3,27) - 1) / 2


export default iota

