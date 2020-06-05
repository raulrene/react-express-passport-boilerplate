import { createBrowserHistory } from 'history'
export const history = createBrowserHistory()

let prevLocation = null
history.listen((location) => {
  if (location.pathname !== '/login') {
    prevLocation = location.pathname
  }
})

export const getPrevLocation = () => prevLocation
