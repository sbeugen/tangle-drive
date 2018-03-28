import iota from '@/plugins/iota' 

export default {
  toggleDownloadActive: ({ commit }) => {
    commit('TOGGLE_DOWNLOAD_ACTIVE')
  },
  setDownloadActive: ({ commit }, payload) => {
    commit('SET_DOWNLOAD_ACTIVE', payload)
  },
  prepareDownload: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      iota.api.findTransactionObjects({bundles: [payload]}, (error, success) => {
        if (error) {
          reject(error)
        } else {
          const jsonString = iota.utils.extractJson(success)
          if (!jsonString) {
            reject('There is no downloadable content in your bundle hash.')
          }
          const messageObj = JSON.parse(jsonString)
          const fileName = messageObj.fileName
          if (!fileName) {
            reject('This Bundle is empty!')
          }
          commit('SET_FILENAME_TO_STATE', fileName)


          const URL = `https://ipfs.io/ipfs/${messageObj.content}`

          commit('SET_FILEURL_TO_STATE', URL)
          resolve()
        }
      })
    })
  }
}
