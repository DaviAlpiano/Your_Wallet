// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { ActionType } from '../../types';
import { AddDespesas, RequestSuccessful } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  infomoedas: [],
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
        infomoedas: Object
          .values(action.playload)
          .filter((moeda) => moeda.codein !== 'BRLT'),
        currencies: Object
          .values(action.playload)
          .filter((moeda) => moeda.codein !== 'BRLT')
          .map((infos) => infos.code),
      };

    case AddDespesas:
      return {
        ...state,
        expenses: [...state.expenses, action.playload],
      };

    default:
      return state;
  }
}

export default wallet;
