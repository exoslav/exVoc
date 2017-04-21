let lsExists = false
export const checkLs = () => {
  try {
      localStorage.setItem('test', 'test')
      localStorage.removeItem('test')
      lsExists = true
      return true
  } catch(e) {
      lsExists = false
      return false
  }
}

export const ls = {
  getItem: key => {
    if(!lsExists)
      return
      
    return localStorage.getItem(key)
  },
  setItem: (key, val) => {
    if(!lsExists)
      return

    return localStorage.setItem(key, val)
  },
  removeItem: key => {
    if(!lsExists)
      return

    return localStorage.removeItem(key)
  },
  clear: () => {
    if(!lsExists)
      return

    return localStorage.clear()
  }
}
