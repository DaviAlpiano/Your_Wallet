import { useSelector } from 'react-redux';
import { InfoMoedas, InfoUser, User } from '../types';



function Header() {
  const infoUser = useSelector((state: InfoUser) => state.user);
  const carteira = useSelector((state:InfoMoedas) => state.wallet);

  return (
    <header>
      <h3 data-testid="email-field">{ infoUser.email }</h3>
      <h3 data-testid="total-field">0</h3>
      <h3 data-testid="header-currency-field">BRL</h3>
    </header>
  );
}

export default Header;
