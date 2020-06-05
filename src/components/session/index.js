import Cookies from 'js-cookie'
import { COOKIE_NAME } from '../../common/config'
const LC_USER_DATA = 'lc-<<APP_NAME_CONCAT>>-user'

/** User session management */
const Session = {
  /**
   * Check if a user is logged in
   * @returns {boolean}
   */
  isLoggedIn: () => {
    return !!Cookies.get(COOKIE_NAME)
  },

  /**
   * Return user data if user is authenticated
   * @returns {null|Object}
   */
  getUserData: () => {
    if (!Session.isLoggedIn()) {
      return null
    }
    return JSON.parse(localStorage.getItem(LC_USER_DATA))
  },

  /**
   * Set user data in local-storage
   * @param jsonData {Object} json
   */
  setUserData: (jsonData) => {
    localStorage.setItem(LC_USER_DATA, JSON.stringify(jsonData))
  },

  logout: () => {
    localStorage.removeItem(LC_USER_DATA)
    Cookies.remove(COOKIE_NAME)
  },
}

export default Session
