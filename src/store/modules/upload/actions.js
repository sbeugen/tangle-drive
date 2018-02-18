import IOTA from 'iota.lib.js' 

const iota = new IOTA({
  'provider': 'http://iotanode.party:14265'
})

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
    console.log(payload)
    return new Promise((resolve, reject) => {
      convertFileToDigitString(payload)
        .then((result) => {
          let tryteMessage = iota.utils.toTrytes(result)
          console.log('Number of Transactions', tryteMessage.length/2187)
        })
        .catch((error) => {
          console.log(error)
        })

      // 2. convert to Trytes
      // 3. Create Bundle
      // 4. Make transaction
    })
  }
}

const convertFileToDigitString = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = (event) => {
      const dataView = new DataView(event.target.result, 0)
      let digitString = ""

      for (let offset = 0; offset < dataView.byteLength; offset+=1) {
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