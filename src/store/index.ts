import {createStore as _createStore} from 'vuex'
import {home} from './modules/home'

export default function createStore() {
  return _createStore({
    modules: {
      home
    }
  });
}
