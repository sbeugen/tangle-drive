import uploadActions from '@/store/modules/upload/actions'

import iota from '@/plugins/iota.js'
jest.mock('@/plugins/iota.js', () => ({
  'iota.api.attachToTangle': jest.fn()
})) 

describe('store.upload.actions.test.js', () => {
  let commit

  beforeEach(() => {
    commit = jest.fn()
  })

  describe('toggleUploadActive', () => {
    it('commits TOGGLE_UPLOAD_ACTIVE', () => {
      uploadActions.toggleUploadActive({ commit })
      expect(commit.mock.calls.length).toEqual(1)
      expect(commit.mock.calls[0][0]).toEqual('TOGGLE_UPLOAD_ACTIVE')
    })
  })

  describe('setUploadActive', () => {
    it('commits SET_UPLOAD_ACTIVE', () => {
      const payload = false
      uploadActions.setUploadActive({ commit }, payload)
      expect(commit.mock.calls.length).toEqual(1)
      expect(commit.mock.calls[0][0]).toEqual('SET_UPLOAD_ACTIVE')
      expect(commit.mock.calls[0][1]).toEqual(payload)
    })
  })

  describe('setFileToState', () => {
    it('commits SET_FILE_TO_STATE', () => {
      const payload = 'test_file'
      uploadActions.setFileToState({ commit }, payload)
      expect(commit.mock.calls.length).toEqual(1)
      expect(commit.mock.calls[0][0]).toEqual('SET_FILE_TO_STATE')
      expect(commit.mock.calls[0][1]).toEqual(payload)
    })
  })

  describe('resetBundleHash', () => {
    it('commits SET_BUNDLE_HASH_TO_STATE', () => {
      const payload = ''
      uploadActions.resetBundleHash({ commit })
      expect(commit.mock.calls.length).toEqual(1)
      expect(commit.mock.calls[0][0]).toEqual('SET_BUNDLE_HASH_TO_STATE')
      expect(commit.mock.calls[0][1]).toEqual(payload)
    })
  })

  describe('setUploadText', () => {
    it('commits SET_UPLOAD_TEXT_TO_STATE', () => {
      const payload = 'uploading'
      uploadActions.setUploadText({ commit }, payload)
      expect(commit.mock.calls.length).toEqual(1)
      expect(commit.mock.calls[0][0]).toEqual('SET_UPLOAD_TEXT_TO_STATE')
      expect(commit.mock.calls[0][1]).toEqual(payload)
    })
  })

  describe('setFileUploadFinished', () => {
    it('commits SET_FILE_UPLOAD_FINISHED', () => {
      const payload = false
      uploadActions.setFileUploadFinished({ commit }, payload)
      expect(commit.mock.calls.length).toEqual(1)
      expect(commit.mock.calls[0][0]).toEqual('SET_FILE_UPLOAD_FINISHED')
      expect(commit.mock.calls[0][1]).toEqual(payload)
    })
  })

  describe('setPowFinished', () => {
    it('commits SET_POW_FINISHED', () => {
      const payload = false
      uploadActions.setPowFinished({ commit }, payload)
      expect(commit.mock.calls.length).toEqual(1)
      expect(commit.mock.calls[0][0]).toEqual('SET_POW_FINISHED')
      expect(commit.mock.calls[0][1]).toEqual(payload)
    })
  })
})