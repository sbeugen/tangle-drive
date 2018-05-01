class IPFS {
  constructor () {
    this.files = {
      get: (content, callback) => {
        return callback(null, [{ content: '123' }])
      }
    }
    this.on = (status, func) => {
      if (status == 'ready') {
        func()
      }
    }
  }
}

export default IPFS

