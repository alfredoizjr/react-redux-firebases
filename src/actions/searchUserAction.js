import {SEARCH_USER} from '../actions/Types';

export const searchForUser = user => {
    return {
        type: SEARCH_USER,
        user
    }
}