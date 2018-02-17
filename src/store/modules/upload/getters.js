export default {
  getUploadActive: state => {
    return state.upload_active
  },
  getFileFromState: state => {
    return state.file
  },
  getBundleHashFromState: state => {
    return state.bundleHash
  }
}