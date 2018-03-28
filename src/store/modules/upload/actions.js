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
  uploadFileToTangle: ({ commit }, payload) => {
    const fileName = payload.name
    const fileType = payload.type
    console.log('Starting upload preparation.')
    return new Promise((resolve, reject) => {
      try {
        const SEED = generateSeed()
        console.log(payload)

        let reader = new FileReader()

        reader.onload = () => {
          const ipfs = new IPFS()
          console.log(ipfs)

          let buffer = Buffer.from(reader.result)

          ipfs.on('ready', () => {
            // Your ipfs is now ready to use \o/
            ipfs.files.add(buffer, async (err, res) => {
              if (err) {
                reject(err)
              } else {
                axios.get(`https://ipfs.io/ipfs/${res[0].hash}`)
                  .then (response => {
                    console.log('response', response)
                  })
                  .catch(error => {
                    console.log('axios error', error)
                  })

                let address = await getNewIOTAAddress(SEED)
                let messageObj = {
                  content: res[0].hash,
                  fileName: fileName
                }
                let tryteMessage = iota.utils.toTrytes(JSON.stringify(messageObj))
                let transfer = createTransfer(tryteMessage, address)
                
                console.log('Sending Transfer.')
                iota.api.sendTransfer(SEED, DEPTH, MWM, transfer, (error, result) => {
                  if (error) {
                    reject(error)
                  } else {
                    commit('SET_BUNDLE_HASH_TO_STATE', result[0].bundle)
                    resolve()
                  }
                })
              }
            })
          })
        }

        reader.readAsArrayBuffer(payload)

    //     let digitString = await convertFileToDigitString(payload)
    //     let tryteMessage = iota.utils.toTrytes(digitString)
    //     let messageArray = createMessageArray(tryteMessage)
    //     let address = await getNewIOTAAddress(SEED)
    //     let transfers = createTransfers(messageArray, address)
    //     transfers.push({
    //       value: 0,
    //       address: address,
    //       message: iota.utils.toTrytes(fileName)
    //     })
    //     console.log('Sending Transfer.')
    //     iota.api.sendTransfer(SEED, DEPTH, MWM, transfers, (error, result) => {
    //       if (error) {
    //         reject(error)
    //       } else {
    //         commit('SET_BUNDLE_HASH_TO_STATE', result[0].bundle)
    //         resolve()
    //       }
    //     })
      } catch (error) {
        reject(error)
      }
    })
  },
  resetBundleHash: ({ commit }) => {
    commit('SET_BUNDLE_HASH_TO_STATE', '')
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