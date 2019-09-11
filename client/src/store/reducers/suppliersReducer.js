import { GETTING_CURTAINS_SUPPLIERS, GETTING_TULLES_SUPPLIERS } from '../actions/actions';

const initialState = {
  curtainsSuppliers: [],
  tullesSuppliers: []
};

const suppliersReducer = ( state = initialState, {type, payload} ) => {
    switch (type) {
      case GETTING_CURTAINS_SUPPLIERS:
        return{
          ...state,
          curtainsSuppliers: payload
        };
      case GETTING_TULLES_SUPPLIERS:
      return{
        ...state,
        tullesSuppliers: payload
      };
      default:
        return state;
    }
};

export default suppliersReducer;