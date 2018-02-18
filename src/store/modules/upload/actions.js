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
    return new Promise((resolve, reject) => {
      convertFileToString(payload)
        .then((result) => {
          console.log(result)
          console.log(iota.utils.toTrytes(result))
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

const convertFileToString = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = (event) => {
      resolve(event.target.result)
    }
    fileReader.onerror = (event) => {
      reject(event)
    }
    fileReader.readAsText(file)
  })
}