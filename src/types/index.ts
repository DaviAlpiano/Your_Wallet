export type User = {
  email: string,
  senha?: string,
};

export type Wallet = {
  email: string,
};

export type ActionType = {
  type: string,
  playload: User | Wallet,
};
