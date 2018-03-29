export default {
  TOGGLE_UPLOAD_ACTIVE: (state) => {
    state.upload_active = !state.upload_active
  },
  SET_UPLOAD_ACTIVE: (state, payload) => {
    state.upload_active = payload
  },
  SET_FILE_TO_STATE: (state, payload) => {
    state.file = payload
  },
  SET_BUNDLE_HASH_TO_STATE: (state, payload) => {
    state.bundleHash = payload
  },
  SET_UPLOAD_TEXT_TO_STATE: (state, payload) => {
    state.uploadText = payload
  },
  SET_FILE_UPLOAD_FINISHED: (state, payload) => {
    state.fileUploadFinished = payload
  },
  SET_POW_FINISHED: (state, payload) => {
    state.powFinished = payload
  }
}