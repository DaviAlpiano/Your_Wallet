import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type User = {
  email: string,
  senha?: string,
};

export type InfoUser = {
  user: User
};

export type InfoMoedas = {
  wallet: Wallet
};

export type InfoDespesa = {
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
  id: number,
  exchangeRates: ObjectMoeda | null,
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
};

export type Wallet = {
  currencies: string[],
  expenses: InfoDespesa[],
  editor: boolean,
  idToEdit: number,
  infomoedas: ObjectMoeda[],
  fetchraiz: ObjectMoeda,
};

export type ActionType = {
  type: string,
  playload: User | Wallet,
};

export type Dispatch = ThunkDispatch<ActionType, null, AnyAction>;
