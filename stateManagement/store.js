import {createStore, combineReducers} from 'redux';
import settingsReducer from './reducers/settingsReducer';

const rootReducer = combineReducers({
      setting: settingsReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;