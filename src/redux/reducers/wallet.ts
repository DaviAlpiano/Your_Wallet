// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { ActionType, InfoDespesa, Wallet } from '../../types';
import { AddDespesas, EditDespesa, RemoveDespesas, RequestSuccessful } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  infomoedas: [],
  fetchraiz: {},
};

function adicionarDespesa(state: Wallet, action: ActionType) {
  if (state.editor) {
    return {
      ...state,
      expenses: state.expenses.map((info:InfoDespesa) => {
        if (info.id === state.idToEdit) {
          return {
            ...info, ...action.playload,
          };
        }
        return info;
      }),
      editor: false,
      idToEdit: null,
    };
  }
  return {
    ...state,
    expenses: [...state.expenses, action.playload],
    editor: false,
    idToEdit: null,
  };
}

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

    case AddDespesas: {
      return adicionarDespesa(state, action);
    }

    case RemoveDespesas:
      return {
        ...state,
        expenses: state.expenses
          .filter((item:InfoDespesa) => item.id.toString() !== action.playload),
      };

    case EditDespesa:
      return {
        ...state,
        editor: true,
        idToEdit: action.playload,
      };

    default:
      return state;
  }
}

export default wallet;
