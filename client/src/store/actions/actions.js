export const GETTING_TULLES = 'GETTING_TULLES';
export const GETTING_CURTAINS = 'GETTING_CURTAINS';
export const GETTING_TULLES_SUPPLIERS = 'GETTING_TULLES_SUPPLIERS';
export const GETTING_CURTAINS_SUPPLIERS = 'GETTING_CURTAINS_SUPPLIERS';
export const GETTING_CHECKED = 'GETTING_CHECKED';
export const GETTING_CHECKED_SUPPLIER = 'GETTING_CHECKED_SUPPLIER';
export const GETTING_FOUND_TULLES = 'GETTING_FOUND_TULLES';
export const GETTING_FOUND_CURTAINS = 'GETTING_FOUND_CURTAINS';
export const GETTING_SEARCH_TEXT = 'GETTING_SEARCH_TEXT';

export const gettingTulles = tulles =>({
  type: GETTING_TULLES,
  payload: tulles
});

export const gettingCurtains = curtains =>({
  type: GETTING_CURTAINS,
  payload: curtains
});

export const gettingCurtainsSuppliers = supliers =>({
  type: GETTING_CURTAINS_SUPPLIERS,
  payload: supliers
});

export const gettingTullesSuppliers = supliers =>({
  type: GETTING_TULLES_SUPPLIERS,
  payload: supliers
});

export const gettingChecked = checked =>({
  type: GETTING_CHECKED,
  payload: checked
});

export const gettingCheckedSupplier = checkedSupplier =>({
  type: GETTING_CHECKED_SUPPLIER,
  payload: checkedSupplier
});

export const gettingFoundTulles = foundTulles =>({
  type: GETTING_FOUND_TULLES,
  payload: foundTulles
});

export const gettingFoundCurtains = foundCurtains =>({
  type: GETTING_FOUND_CURTAINS,
  payload: foundCurtains
});

export const gettingSearchText = searchText =>({
  type: GETTING_SEARCH_TEXT,
  payload: searchText
});