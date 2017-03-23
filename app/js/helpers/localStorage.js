export default {
  isLocalstorageSupported: () => {
    var testKey = 'test', storage = window.localStorage
    try {
      storage.setItem(testKey, '1')
      storage.removeItem(testKey)
      return true
    } catch (error) {
      return false
    }
  }
}
