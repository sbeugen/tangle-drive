import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Vue from 'vue'

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

  describe('Computed property showLoader', () => {
    it('returns true (renders the background div) if getFileUploadFinished is false', () => {
      uploadGetters.getFileUploadFinished.mockImplementation(() => false)
      uploadGetters.getPowFinished.mockImplementation(() => true)
      downloadGetters.getDownloadPreparationFinished.mockImplementation(() => true)

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

      const cmp = shallow(LoadingScreen, { store, localVue })
      const backgroundDiv = cmp.find('.screen-background')
      expect(backgroundDiv.exists()).toBe(true)
    })

    it('returns true (renders the background div) if getPowFinished is false', () => {
      uploadGetters.getFileUploadFinished.mockImplementation(() => true)
      uploadGetters.getPowFinished.mockImplementation(() => false)
      downloadGetters.getDownloadPreparationFinished.mockImplementation(() => true)

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

      const cmp = shallow(LoadingScreen, { store, localVue })
      const backgroundDiv = cmp.find('.screen-background')
      expect(backgroundDiv.exists()).toBe(true)
    })

    it('returns true (renders the background div) if getDownloadPreparationFinished is false', () => {
      uploadGetters.getFileUploadFinished.mockImplementation(() => true)
      uploadGetters.getPowFinished.mockImplementation(() => true)
      downloadGetters.getDownloadPreparationFinished.mockImplementation(() => false)

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

      const cmp = shallow(LoadingScreen, { store, localVue })
      const backgroundDiv = cmp.find('.screen-background')
      expect(backgroundDiv.exists()).toBe(true)
    })

    it('returns false (does not render the background div) if all getters are true', () => {
      uploadGetters.getFileUploadFinished.mockImplementation(() => true)
      uploadGetters.getPowFinished.mockImplementation(() => true)
      downloadGetters.getDownloadPreparationFinished.mockImplementation(() => true)

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

      const cmp = shallow(LoadingScreen, { store, localVue })
      const backgroundDiv = cmp.find('.screen-background')
      expect(backgroundDiv.exists()).toBe(false)
    })
  })

  describe('computed property showText', () => {
    it('returns the upload text/ shows the upload text in the h2 tag if the getUploadText returns a not empty String', () => {
      uploadGetters.getUploadText.mockImplementation(() => 'Uploading')
      downloadGetters.getDownloadText.mockImplementation(() => '')

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

      const cmp = shallow(LoadingScreen, { store, localVue })
      const h2 = cmp.find('h2')
      expect(h2.text()).toBe('Uploading')
    })

    it('returns the download text/ shows the download text in the h2 tag if the getDownloadText returns a not empty String', () => {
      uploadGetters.getUploadText.mockImplementation(() => '')
      downloadGetters.getDownloadText.mockImplementation(() => 'Downloading')

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

      const cmp = shallow(LoadingScreen, { store, localVue })
      const h2 = cmp.find('h2')
      expect(h2.text()).toBe('Downloading')
    })

    it('returns an empty string/ shows an empty string in the h2 tag if the getDownloadText and getUploadText return an empty String', () => {
      uploadGetters.getUploadText.mockImplementation(() => '')
      downloadGetters.getDownloadText.mockImplementation(() => '')

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

      const cmp = shallow(LoadingScreen, { store, localVue })
      const h2 = cmp.find('h2')
      expect(h2.text()).toBe('')
    })
  })
})