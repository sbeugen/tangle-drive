import iota from '@/plugins/iota' 
import IPFS from 'ipfs'

export default {
  toggleDownloadActive: ({ commit }) => {
    commit('TOGGLE_DOWNLOAD_ACTIVE')
  },
  setDownloadActive: ({ commit }, payload) => {
    commit('SET_DOWNLOAD_ACTIVE', payload)
  },
  prepareDownload: ({ commit, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      dispatch('setDownloadPreparationFinished', false)
      dispatch('setDownloadText', 'Preparing download...')
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

          const ipfs = new IPFS()

          ipfs.on('ready', () => {
            ipfs.files.get(messageObj.content, (error, response) => {
              if (error) {
                reject(error)
              }
              const blob = new Blob([response[0].content], {type: 'application/octet-stream'})
              const blobURL = URL.createObjectURL(blob)
              commit('SET_FILEURL_TO_STATE', blobURL)
              dispatch('setDownloadPreparationFinished', true)
              dispatch('setDownloadText', '')
              resolve()
            })
          })
        }
      })
    })
  },
  setDownloadText: ({ commit }, payload) => {
    commit('SET_DOWNLOAD_TEXT', payload)
  },
  setDownloadPreparationFinished: ({ commit }, payload) => {
    commit('SET_DOWNLOAD_PREPARATION_FINISHED', payload)
  }
}
