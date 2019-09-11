import { combineReducers } from 'redux';
import itemsReducer from './reducers/itemsReducer';
import suppliersReducer from './reducers/suppliersReducer';
import checkedReducer from './reducers/checkedReducer';

export default combineReducers({
  items: itemsReducer,
  suppliers: suppliersReducer,
  checked: checkedReducer
});