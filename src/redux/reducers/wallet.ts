// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { ActionType } from '../../types';
import { AddDespesas, RequestSuccessful } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [{id: 0,}],
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

    case AddDespesas:
      if(state.expenses[0].id === 0) {
        return {
          ...state,
          expenses: [action.playload],
        }
      }
      else return {
        ...state,
        expenses: [...state.expenses, action.playload],
      }

    default:
      return state;
  }
}

export default wallet;
