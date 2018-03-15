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
  setFileToState: ({ commit }, payload) => {
    commit('SET_FILE_TO_STATE', payload)
  },
  uploadFileToTangle: ({ commit }, payload) => {
    const fileName = payload.name
    const fileType = payload.type

    return new Promise(async (resolve, reject) => {
      try {
        let digitString = await convertFileToDigitString(payload)
        let tryteMessage = iota.utils.toTrytes(digitString)
        let messageArray = createMessageArray(tryteMessage)
        let address = await getNewIOTAddress()
        let transfers = createTransfers(messageArray, address)
        console.log(transfers)
        iota.api.sendTransfer(SEED, DEPTH, MWM, transfers, (error, success) => {
          if (error) {
            console.log(error)
          } else {
            console.log('final success', success)
          }
        })
      } catch (e) {
        console.log(e)
      }
    })
  }
}

const convertFileToDigitString = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = (event) => {
      const dataView = new DataView(event.target.result, 0)
      let digitString = ""

      for (let offset = 0; offset < dataView.byteLength; offset += 1) {
        digitString = digitString + dataView.getUint8(offset)
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

const getNewIOTAddress = () => {
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