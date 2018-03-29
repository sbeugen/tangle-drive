export default {
  getUploadActive: state => {
    return state.upload_active
  },
  getFileFromState: state => {
    return state.file
  },
  getBundleHashFromState: state => {
    return state.bundleHash
  },
  getUploadText: state => {
    return state.uploadText
  },
  getFileUploadFinished: state => {
    return state.fileUploadFinished
  },
  getPowFinished: state => {
    return state.powFinished
  }
}