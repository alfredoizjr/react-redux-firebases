import {SEARCH_USER} from "../actions/Types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_USER:
      return {
        ...state,
        name: action.user.name,
        last: action.user.last,
        code: action.user.code,
        career: action.user.career
      };

    default:
      return state;
  }
}
