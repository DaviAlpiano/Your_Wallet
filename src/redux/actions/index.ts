// Coloque aqui suas actions
import { Dispatch, InfoDespesa, User } from '../../types';

export const RequestSuccessful = 'RequestSuccessful';
export const AddDespesas = 'AddDespesas';
export const RemoveDespesas = 'RemoveDespesas';
export const EditDespesa = 'EditDespesa';

export const actionUser = (infouser:User) => ({
  type: 'user',
  playload: infouser,
});

export function requestStarted() {
  return { type: 'requestStarted' };
}

export function requestSuccessful(moedas: object) {
  return {
    type: RequestSuccessful,
    playload: moedas,
  };
}

export function fetchmoedas() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(requestStarted());
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      dispatch(requestSuccessful(data));
    } catch (error: any) {
      console.log(error);
    }
  };
}

export function addDespesa(infos:InfoDespesa) {
  return {
    type: AddDespesas,
    playload: infos,
  };
}

export function removeDespesa(id:string) {
  return {
    type: RemoveDespesas,
    playload: id,
  };
}

export function editDespesa(id:number) {
  return {
    type: EditDespesa,
    playload: id,
  };
}
