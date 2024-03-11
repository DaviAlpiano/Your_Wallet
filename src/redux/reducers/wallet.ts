// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { ActionType } from '../../types';
import { RequestSuccessful } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function wallet(state = INITIAL_STATE, action: ActionType) {
  switch (action.type) {
    case 'requestStarted':
      return {
        ...state,
      };

    case RequestSuccessful:
      return {
        ...state,
        currencies: Object.values(action.playload).filter((moeda) => moeda.codein !== 'BRLT'),
      };

    default:
      return state;
  }
}

export default wallet;
