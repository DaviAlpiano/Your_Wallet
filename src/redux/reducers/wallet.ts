// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { ActionType, InfoDespesa } from '../../types';
import { AddDespesas, RemoveDespesas, RequestSuccessful } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  infomoedas: [],
  fetchraiz: {},
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
        fetchraiz: action.playload,
        infomoedas: Object
          .values(action.playload),
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

    case RemoveDespesas:
      return {
        ...state,
        expenses: state.expenses
          .filter((item:InfoDespesa) => item.id.toString() !== action.playload),
      };

    default:
      return state;
  }
}

export default wallet;
