import ItemsService from '../services/ItemsService';
const initialState = {
  all: [],
};

const ITEMS_LOADED = 'nanolog/items/ITEMS_LOADED';
const NEW_ITEM = 'nanolog/items/NEW_ITEM';
const DELETE_ITEM = 'nanolog/items/DELETE_ITEM';

export function createItem(name) {
  return { type: NEW_ITEM, name };
}

export function deleteItem(name) {
  return { type: DELETE_ITEM, name };
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
