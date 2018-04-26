import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Vue from 'vue'

import ButtonGroup from '../src/components/main_page/ButtonGroup'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('ButtonGroup.test.js', () => {
  let store
  let uploadGetters
  let downloadGetters
  let uploadActions
  let downloadActions
  let cmp
  const $router = {
    push: jest.fn()
  }

  uploadGetters = {
    getUploadActive: jest.fn().mockImplementation(() => true)
  }
  downloadGetters = {
    getDownloadActive: jest.fn().mockImplementation(() => false)
  }
  uploadActions = {
    toggleUploadActive: jest.fn()
  }
  downloadActions = {
    toggleDownloadActive: jest.fn()
  }

  beforeEach(() => {
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
          getters: downloadGetters,
          actions: downloadActions
        }
      }
    })

    cmp = shallow(ButtonGroup, { store, localVue, mocks: {
      $router
    }})
  })

  describe('snapshot', () => {
    it('has expected html structure', () => {
      expect(cmp.element).toMatchSnapshot()
    })
  })

  describe('click on Download Button', () => {
    it('calls handleDownloadButton', () => {
      cmp.vm.handleDownloadButton = jest.fn()

      let downloadButton = cmp.findAll('button').at(1)
      downloadButton.trigger('click')
      expect(cmp.vm.handleDownloadButton).toBeCalled()
    })

    it('toggleButtonStates is called', () => {
      cmp.vm.toggleButtonStates = jest.fn()

      let downloadButton = cmp.findAll('button').at(1)
      downloadButton.trigger('click')
      expect(cmp.vm.toggleButtonStates).toBeCalled()
    })

    it('toggleUploadActive and $router.push is called', () => {
      let downloadButton = cmp.findAll('button').at(1)
      downloadButton.trigger('click')
      expect(cmp.vm.$router.push).toBeCalled()
      expect(uploadActions.toggleUploadActive).toBeCalled()
    })

    it('toggleDownloadActive is called', () => {
      let downloadButton = cmp.findAll('button').at(1)
      downloadButton.trigger('click')
      expect(downloadActions.toggleDownloadActive).toBeCalled()
    })
    
    it('Download Button has active class UploadButton has no active class', () => {
      downloadGetters.getDownloadActive.mockImplementation(() => true)
      uploadGetters.getUploadActive.mockImplementation(() => false)

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
            getters: downloadGetters,
            actions: downloadActions
          }
        }
      })

      cmp = shallow(ButtonGroup, { store, localVue, mocks: {
        $router
      }})
      let uploadButton = cmp.findAll('button').at(0)
      let downloadButton = cmp.findAll('button').at(1)

      expect(uploadButton.classes()).not.toContain('active')
      expect(downloadButton.classes()).toContain('active')
    })
  })
  describe('click on Upload Button', () => {
    it('calls handleUploadButton', () => {
      cmp.vm.handleUploadButton = jest.fn()

      let uploadButton = cmp.findAll('button').at(0)
      uploadButton.trigger('click')
      expect(cmp.vm.handleUploadButton).toBeCalled()
    })

    it('toggleButtonStates and $router.push is called', () => {
      cmp.vm.toggleButtonStates = jest.fn()

      let uploadButton = cmp.findAll('button').at(0)
      uploadButton.trigger('click')
      expect(cmp.vm.$router.push).toBeCalled()
      expect(cmp.vm.toggleButtonStates).toBeCalled()
    })

    it('toggleUploadActive is called', () => {
      let uploadButton = cmp.findAll('button').at(0)
      uploadButton.trigger('click')
      expect(uploadActions.toggleUploadActive).toBeCalled()
    })

    it('toggleUploadActive is called', () => {
      let uploadButton = cmp.findAll('button').at(0)
      uploadButton.trigger('click')
      expect(downloadActions.toggleDownloadActive).toBeCalled()
    })

    it('Upload Button has active class UploadButton has no active class', () => {
      downloadGetters.getDownloadActive.mockImplementation(() => false)
      uploadGetters.getUploadActive.mockImplementation(() => true)

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
            getters: downloadGetters,
            actions: downloadActions
          }
        }
      })

      cmp = shallow(ButtonGroup, { store, localVue, mocks: {
        $router
      }})
      let uploadButton = cmp.findAll('button').at(0)
      let downloadButton = cmp.findAll('button').at(1)

      expect(uploadButton.classes()).toContain('active')
      expect(downloadButton.classes()).not.toContain('active')
    })
  })
})