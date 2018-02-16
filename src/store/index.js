import Vuex from 'vuex'

import upload from './modules/upload'
import download from './modules/download'

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    upload,
    download
  }
})

export { store }