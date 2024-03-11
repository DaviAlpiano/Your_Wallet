import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type User = {
  email: string,
  senha?: string,
};

export type ObjectMoeda = {
  ask: string;
  bid: string;
  code: string;
  codein: string;
  create_date: string;
  high: string;
  low: string;
  name: string;
  pctChange: string;
  timestamp: string;
  varBid: string;
}

export type Wallet = {
  currencies: ObjectMoeda[],
  expenses: object[],
  editor: boolean,
  idToEdit: number,
};

export type ActionType = {
  type: string,
  playload: User | Wallet,
};

export type Dispatch = ThunkDispatch<ActionType, null, AnyAction>;
