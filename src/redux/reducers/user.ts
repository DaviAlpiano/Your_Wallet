import { ActionType } from '../../types';

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action: ActionType) {
  switch (action.type) {
    case 'user':
      return {
        ...state,
        email: action.playload.email,
      };
    default:
      return state;
  }
}

export default user;
