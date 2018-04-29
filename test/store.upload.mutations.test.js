import uploadMutations from '@/store/modules/upload/mutations' 

describe('store.upload.mutations.test.js', () => {
  let state = {
    upload_active: true,
    file: '',
    bundleHash: '',
    uploadText: '',
    fileUploadFinished: true,
    powFinished: true
  }

  describe('TOGGLE_UPLOAD_ACTIVE', () => {
    it('should toggle upload_active', () => {
      const current_upload_active = state.upload_active
      uploadMutations['TOGGLE_UPLOAD_ACTIVE'](state)
      expect(state.upload_active).toEqual(!current_upload_active)
    })
  })

  describe('SET_UPLOAD_ACTIVE', () => {
    it('should set the payload to upload_active', () => {
      const payload = !state.upload_active
      uploadMutations['SET_UPLOAD_ACTIVE'](state, payload)
      expect(state.upload_active).toEqual(payload)
    })
  })

  describe('SET_FILE_TO_STATE', () => {
    it('should set the payload to file', () => {
      const payload = 'test_file'
      uploadMutations['SET_FILE_TO_STATE'](state, payload)
      expect(state.file).toEqual(payload)
    })
  })

  describe('SET_BUNDLE_HASH_TO_STATE', () => {
    it('should set the payload to bundleHash', () => {
      const payload = '123456789012345678901234567890123456789012345678901234567890123456789012345678901'
      uploadMutations['SET_BUNDLE_HASH_TO_STATE'](state, payload)
      expect(state.bundleHash).toEqual(payload)
    })
  })

  describe('SET_UPLOAD_TEXT_TO_STATE', () => {
    it('should set the payload to uploadText', () => {
      const payload = 'uploading'
      uploadMutations['SET_UPLOAD_TEXT_TO_STATE'](state, payload)
      expect(state.uploadText).toEqual(payload)
    })
  })

  describe('SET_FILE_UPLOAD_FINISHED', () => {
    it('should set the payload to fileUploadFinished', () => {
      const payload = !state.fileUploadFinished
      uploadMutations['SET_FILE_UPLOAD_FINISHED'](state, payload)
      expect(state.fileUploadFinished).toEqual(payload)
    })
  })

  describe('SET_POW_FINISHED', () => {
    it('should set the payload to fileUploadFinished', () => {
      const payload = !state.powFinished
      uploadMutations['SET_POW_FINISHED'](state, payload)
      expect(state.powFinished).toEqual(payload)
    })
  })
})