import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { InfoMoedas, InfoUser } from '../types';
import styles from './Header.module.css';

function Header() {
  const infoUser = useSelector((state: InfoUser) => state.user);
  const carteira = useSelector((state:InfoMoedas) => state.wallet);
  const [valorTotal, setValorTotal] = useState<number>(0);

  useEffect(() => {
    if (carteira.expenses.length > 0) {
      const valorArray = carteira.expenses.reduce((total, despesa) => {
        const moeda = carteira.infomoedas
          .find((infosmoeda) => infosmoeda.code === despesa.currency);
        const valor = parseFloat(despesa.value) * parseFloat(moeda.ask);
        return total + valor;
      }, 0);

      setValorTotal(valorArray);
    }

    if (carteira.expenses.length === 0) {
      setValorTotal(0);
    }
  }, [carteira.expenses]);

  return (
    <header className={ styles.header }>
      <h3 className={ styles.h31 }>&#x1F4B8; Your Wallet &#x1F4B8;</h3>
      <h3 className={ styles.h32 }>Total de despesas:</h3>
      <h3 className={ styles.h31 } data-testid="total-field">{valorTotal.toFixed(2)}</h3>
      <h3 className={ styles.h32 } data-testid="header-currency-field">BRL</h3>
      <h3 className={ styles.h31 } data-testid="email-field">{ infoUser.email }</h3>
    </header>
  );
}

export default Header;
