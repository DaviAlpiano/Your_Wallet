// Coloque aqui suas actions

import { User } from '../../types';

export const actionUser = (infouser:User) => ({
  type: 'user',
  playload: infouser,
});
