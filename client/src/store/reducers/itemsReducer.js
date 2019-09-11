import { GETTING_TULLES, GETTING_CURTAINS, GETTING_FOUND_TULLES, GETTING_FOUND_CURTAINS, GETTING_SEARCH_TEXT } from '../actions/actions';

const initialState = {
  tulles: [],
  curtains: [],
  foundTulles: [],
  foundCurtains: [],
  searchText: ''
};

const itemsReducer = ( state = initialState, {type, payload} ) => {
    switch (type) {
      case GETTING_TULLES:
        return{
          ...state,
          tulles: payload
        };
      case GETTING_CURTAINS:
        return{
          ...state,
          curtains: payload
        };
      case GETTING_FOUND_TULLES:
        return{
          ...state,
          foundTulles: payload
        };
      case GETTING_FOUND_CURTAINS:
        return{
          ...state,
          foundCurtains: payload
        };
      case GETTING_SEARCH_TEXT:
        return{
          ...state,
          searchText: payload
        };
      default:
        return state;
    }
};

export default itemsReducer;