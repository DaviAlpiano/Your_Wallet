import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { InfoMoedas, InfoUser } from '../types';

function Header() {
  const infoUser = useSelector((state: InfoUser) => state.user);
  const carteira = useSelector((state:InfoMoedas) => state.wallet);
  const [valorTotal, setValorTotal] = useState<number>(0);

  useEffect(() => {
    if (carteira.expenses.length > 0) {
      const ultimaDespesa = carteira.expenses.length - 1;
      const despesa = carteira.expenses[ultimaDespesa];
      const moeda = despesa.exchangeRates
        .find((infosmoeda) => infosmoeda.code === despesa.currency);
      const valor = parseFloat(despesa.value) * parseFloat(moeda.ask);
      setValorTotal((valorTotal1) => valorTotal1 + valor);
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
