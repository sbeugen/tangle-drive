import iota, {
  MESSAGE_LENGTH,
  SEED,
  MWM,
  DEPTH
} from '@/plugins/iota'

export default {
  toggleUploadActive: ({ commit }) => {
    commit('TOGGLE_UPLOAD_ACTIVE')
  },
  setUploadActive: ({ commit }, payload) => {
    commit('SET_UPLOAD_ACTIVE', payload)
  },
  setFileToState: ({ commit }, payload) => {
    commit('SET_FILE_TO_STATE', payload)
  },
  uploadFileToTangle: ({ commit }, payload) => {
    const fileName = payload.name
    const fileType = payload.type
    console.log('Starting upload preparation.')
    return new Promise(async (resolve, reject) => {
      try {
        let digitString = await convertFileToDigitString(payload)
        let tryteMessage = iota.utils.toTrytes(digitString)
        let messageArray = createMessageArray(tryteMessage)
        let address = await getNewIOTAAddress()
        let transfers = createTransfers(messageArray, address)
        transfers.push({
          value: 0,
          address: address,
          message: iota.utils.toTrytes(fileName)
        })
        console.log('Sending Transfer.')
        iota.api.sendTransfer(SEED, DEPTH, MWM, transfers, (error, result) => {
          if (error) {
            reject(error)
          } else {
            commit('SET_BUNDLE_HASH_TO_STATE', result[0].bundle)
            resolve()
          }
        })
      } catch (error) {
        reject(error)
      }
    })
  },
  resetBundleHash: ({ commit }) => {
    commit('SET_BUNDLE_HASH_TO_STATE', '')
  }
}

const convertFileToDigitString = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = (event) => {
      const dataView = new DataView(event.target.result, 0)
      let digitString = ''
      let tempDigit = ''
      for (let offset = 0; offset < dataView.byteLength; offset += 1) {
        tempDigit = String(dataView.getUint8(offset))
        if (tempDigit.length === 1) {
          tempDigit = '00' + tempDigit
        }
        if (tempDigit.length === 2) {
          tempDigit = '0' + tempDigit
        }
        digitString = digitString + tempDigit
      }
      resolve(digitString)
    }
    fileReader.onerror = (event) => {
      reject(event)
    }
    fileReader.readAsArrayBuffer(file)
  })
}

const createMessageArray = (tryteMessage) => {
  let messageArray = []
  let numberOfMessages = Math.floor(tryteMessage.length / MESSAGE_LENGTH)
  for (let i = 0; i < numberOfMessages; i++) {
    messageArray.push(tryteMessage.slice(i * MESSAGE_LENGTH, (i + 1) * MESSAGE_LENGTH))
  }
  let lastMessageSize = tryteMessage.length % MESSAGE_LENGTH
  if (lastMessageSize > 0) {
    messageArray.push(tryteMessage.slice(tryteMessage.length - lastMessageSize, tryteMessage.length))
  }
  return messageArray
}

const getNewIOTAAddress = () => {
  return new Promise((resolve, reject) => {
    iota.api.getNewAddress(SEED, (error, address) => {
      if (error) {
        reject(error)
      } else {
        resolve(address)
      }
    })
  })
}

const createTransfers = (messageArray, address) => {
  let transfers = []
  messageArray.map(message => {
    transfers.push({
      value: 0,
      address: address,
      message: message
    })
  })
  return transfers
}