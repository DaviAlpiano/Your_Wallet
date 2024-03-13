import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { InfoMoedas, InfoUser } from '../types';

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
    <header>
      <h3 data-testid="email-field">{ infoUser.email }</h3>
      <h3 data-testid="total-field">{valorTotal.toFixed(2)}</h3>
      <h3 data-testid="header-currency-field">BRL</h3>
    </header>
  );
}

export default Header;
