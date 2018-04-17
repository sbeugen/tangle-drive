import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import LoadingScreen from '../src/components/LoadingScreen'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('LoadingScreen.test.js', () => {
  let store
  let uploadGetters
  let downloadGetters
  let uploadActions

  beforeEach(() => {
    uploadGetters = {
      getUploadText: jest.fn().mockImplementation(() => 'Upload Prep.'),
      getFileUploadFinished: jest.fn().mockImplementation(() => false),
      getPowFinished: jest.fn().mockImplementation(() => true)
    }
    downloadGetters = {
      getDownloadText: jest.fn().mockImplementation(() => ''),
      getDownloadPreparationFinished: jest.fn().mockImplementation(() => true)
    }
    uploadActions = {
      setUploadText: jest.fn()
    }

    store = new Vuex.Store({
      strict: true,
      modules: {
        upload: {
          namespaced: true,
          getters: uploadGetters,
          actions: uploadActions
        },
        download: {
          namespaced: true,
          getters: downloadGetters
        }
      }
    })
  })

  describe('snapshot', () => {
    it('has expected html structure', () => {
      const cmp = shallow(LoadingScreen, { store, localVue })
      expect(cmp.element).toMatchSnapshot()
    })
  })
})