import iota, {
  MESSAGE_LENGTH,
  MWM,
  DEPTH
} from '@/plugins/iota'

import IPFS from 'ipfs'
import axios from 'axios'

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
  uploadFileToTangle: ({ commit, dispatch }, payload) => {
    const FILE_NAME = payload.name

    dispatch('setFileUploadFinished', false)
    dispatch('setPowFinished', false)
    dispatch('setUploadText', 'Preparing upload...')
    return new Promise((resolve, reject) => {
      try {
        const SEED = generateSeed()

        let reader = new FileReader()

        reader.onload = () => {
          const ipfs = new IPFS()

          let buffer = Buffer.from(reader.result)

          ipfs.on('ready', () => {
            dispatch('setUploadText', 'Uploading file to ipfs...')
            ipfs.files.add(buffer, async (err, res) => {
              if (err) {
                reject(err)
              } else {
                axios.get(`https://ipfs.io/ipfs/${res[0].hash}`)
                  .then (response => {
                    dispatch('setFileUploadFinished', true)
                  })
                  .catch(error => {
                    dispatch('setFileUploadFinished', true)
                    reject(error)
                  })

                let address = await getNewIOTAAddress(SEED)
                let messageObj = {
                  content: res[0].hash,
                  fileName: FILE_NAME
                }
                let tryteMessage = iota.utils.toTrytes(JSON.stringify(messageObj))
                let transfer = createTransfer(tryteMessage, address)
                
                dispatch('setUploadText', 'Doing POW...')
                iota.api.sendTransfer(SEED, DEPTH, MWM, transfer, (error, result) => {
                  if (error) {
                    dispatch('setPowFinished', true)
                    reject(error)
                  } else {
                    dispatch('setPowFinished', true)
                    commit('SET_BUNDLE_HASH_TO_STATE', result[0].bundle)
                    resolve()
                  }
                })
              }
            })
          })
        }

        reader.readAsArrayBuffer(payload)
      } catch (error) {
        reject(error)
      }
    })
  },
  resetBundleHash: ({ commit }) => {
    commit('SET_BUNDLE_HASH_TO_STATE', '')
  },
  setUploadText: ({ commit }, payload) => {
    commit('SET_UPLOAD_TEXT_TO_STATE', payload)
  },
  setFileUploadFinished: ({ commit }, payload) => {
    commit('SET_FILE_UPLOAD_FINISHED', payload)
  },
  setPowFinished: ({ commit }, payload) => {
    commit('SET_POW_FINISHED', payload)
  }
}

const generateSeed = () => {
  let trytes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9'
  let seed = ''

  for (let i = 1; i <= 81; i++){
    seed = seed + trytes.charAt(Math.floor(Math.random()*trytes.length))
  }
  return seed
}

const getNewIOTAAddress = (seed) => {
  return new Promise((resolve, reject) => {
    iota.api.getNewAddress(seed, (error, address) => {
      if (error) {
        reject(error)
      } else {
        resolve(address)
      }
    })
  })
}

const createTransfer = (message, address) => {
  let transfer = []
  transfer.push({
    value: 0,
    address: address,
    message: message
  })
  return transfer
}