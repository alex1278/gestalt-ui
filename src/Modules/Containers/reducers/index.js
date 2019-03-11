import { combineReducers } from 'redux';
import reducerFactory from 'config/lib/reducerFactory';
import containerModel from '../models/container';
import container from './container';
import containers from './containers';

export default combineReducers({
  container,
  containers,
  containerImport: reducerFactory({
    verbs: ['import'],
    key: 'container',
    category: 'container',
    model: containerModel.get(),
  }),
});
