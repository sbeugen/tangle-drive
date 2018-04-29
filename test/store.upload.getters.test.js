import uploadGetters from '@/store/modules/upload/getters'

describe('store.upload.getters.test.js', () => {
  let state = {
    upload_active: true,
    file: 'test-file',
    bundleHash: '123456789012345678901234567890123456789012345678901234567890123456789012345678901',
    uploadText: 'uploading',
    fileUploadFinished: true,
    powFinished: true  
  }

  describe('getUploadActive', () => {
    it('returns upload_active form state', () => {
      expect(uploadGetters.getUploadActive(state)).toEqual(state.upload_active)
    })
  })

  describe('getFileFromState', () => {
    it('returns file form state', () => {
      expect(uploadGetters.getFileFromState(state)).toEqual(state.file)
    })
  })

  describe('getBundleHashFromState', () => {
    it('returns bundleHash form state', () => {
      expect(uploadGetters.getBundleHashFromState(state)).toEqual(state.bundleHash)
    })
  })

  describe('getUploadText', () => {
    it('returns uploadText form state', () => {
      expect(uploadGetters.getUploadText(state)).toEqual(state.uploadText)
    })
  })

  describe('getFileUploadFinished', () => {
    it('returns fileUploadFinished form state', () => {
      expect(uploadGetters.getFileUploadFinished(state)).toEqual(state.fileUploadFinished)
    })
  })

  describe('getPowFinished', () => {
    it('returns powFinished form state', () => {
      expect(uploadGetters.getPowFinished(state)).toEqual(state.powFinished)
    })
  })
})