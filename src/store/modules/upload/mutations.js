export default {
  TOGGLE_UPLOAD_ACTIVE: (state) => {
    state.upload_active = !state.upload_active
  },
  SET_FILE_TO_STATE: (state, payload) => {
    state.file = payload
  }
}