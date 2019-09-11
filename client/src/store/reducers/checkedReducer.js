import { GETTING_CHECKED, GETTING_CHECKED_SUPPLIER } from '../actions/actions';

const initialState = {
  checked: [],
  checkedSupplier: { name: 'всі', type: '' }
};

const checkedReducer = ( state = initialState, {type, payload} ) => {
    switch (type) {
      case GETTING_CHECKED:
        return{
          ...state,
          checked: payload
        };
      case GETTING_CHECKED_SUPPLIER:
        return{
          ...state,
          checkedSupplier: payload
        };
      default:
        return state;
    }
};

export default checkedReducer;