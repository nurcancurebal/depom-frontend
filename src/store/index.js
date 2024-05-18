
import { createStore } from 'vuex'

import inventory from './inventory'
import auth from './auth'
import user from './user'

export default createStore({
  modules: {
    inventory,
    auth,
    user
  }
})