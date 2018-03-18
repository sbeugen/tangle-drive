import iota from '@/plugins/iota' 

export default {
  toggleDownloadActive: ({ commit }) => {
    commit('TOGGLE_DOWNLOAD_ACTIVE')
  },
  prepareDownload: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      iota.api.findTransactionObjects({bundles: [payload]}, (error, success) => {
        if (error) {
          reject(error)
        } else {
          const messageArray = createMessageArray(success)
          if (messageArray.length < 2) {
            reject('There is no file in your Bundle!')
          }

          const fileName = iota.utils.fromTrytes(messageArray[messageArray.length -1])
          if (!fileName) {
            reject('This Bundle is empty!')
          }
          commit('SET_FILENAME_TO_STATE', fileName)

          const digitString = createDigitString(messageArray)
          const byteArray = createByteArray(digitString)
          const blob = new Blob([byteArray], {type: 'application/octet-stream'})
  
          const blobURL = URL.createObjectURL(blob)
          commit('SET_FILEURL_TO_STATE', blobURL)
          resolve()
        }
      })
    })
  }
}

const createMessageArray = (unorderedArray) => {
  let messageArray = []
  unorderedArray.map(element => {
    let index = element.currentIndex
    messageArray[index] = element.signatureMessageFragment
    while (messageArray[index].slice(-1) === '9') {
      messageArray[index] = messageArray[index].slice(0,-1)
    }
  })
  return messageArray
}

const createDigitString = (messageArray) => {
  let digitString = ''
  for (let index = 0; index < messageArray.length-1; index++) {
    digitString = digitString + iota.utils.fromTrytes(messageArray[index])
  }
  return digitString
}

const createByteArray = (digitString) => {
  const ARRAY_LENGTH = digitString.length / 3
  let offset = 0
  let array = new Array(ARRAY_LENGTH)

  for (let index = 0; index < ARRAY_LENGTH; index++) {
    array[index] = Number(digitString.slice(offset, offset + 3))
    offset = offset + 3
  }
  return new Uint8Array(array)
}