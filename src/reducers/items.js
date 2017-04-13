import ItemsService from '../services/ItemsService';
const initialState = {
  all: [],
};

const ITEMS_LOADED = 'nanolog/items/ITEMS_LOADED';
const NEW_ITEM = 'nanolog/items/NEW_ITEM';
const DELETE_ITEM = 'nanolog/items/DELETE_ITEM';

export function loadItems() {
  return dispatch => {
    ItemsService.getItems().then(items => {
      dispatch({ type: ITEMS_LOADED, items });
    });
  };
}

export function createItem(name) {
  return dispatch => {
    ItemsService.createItem(name).then(() => {
      dispatch({ type: NEW_ITEM, name });
    });
  };
}

export function deleteItem(name) {
  return dispatch => {
    ItemsService.deleteItem(name).then(() => {
      dispatch({ type: DELETE_ITEM, name });
    });
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ITEMS_LOADED:
      return {
        ...state,
        all: action.items,
      };
    case NEW_ITEM:
      return {
        ...state,
        all: [...state.all, { name: action.name }],
      };
    case DELETE_ITEM:
      return {
        ...state,
        all: state.all.filter(i => i.name !== action.name),
      };
  }
  return state;
}
