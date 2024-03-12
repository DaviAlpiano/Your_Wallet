import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Dispatch, InfoDespesa, InfoMoedas } from '../types';
import { addDespesa, fetchmoedas } from '../redux/actions';

function WalletForm() {
  const carteira = useSelector((state:InfoMoedas) => state.wallet);
  const dispatch:Dispatch = useDispatch();
  const [form, setForm] = useState<InfoDespesa>({
    value: '',
    description: '',
    currency: 'USD',
    method: 'dinheiro',
    tag: 'alimentacao',
    id: 0,
    exchangeRates: [],
  });

  const tamanhoId = carteira.expenses.length;

  const handleChange = (
    { target }:
    React.ChangeEvent<HTMLInputElement> |
    React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { id, value } = target;
    setForm({ ...form,
      [id]: value,
      id: tamanhoId,
      exchangeRates: carteira.infomoedas.map((element) => element),
    });
  };

  useEffect(() => {
    dispatch(fetchmoedas());
  }, [dispatch]);

  return (
    <form
      onSubmit={ (e) => {
        e.preventDefault();
        dispatch(fetchmoedas());
        dispatch(addDespesa(form));
        setForm({ ...form, value: '', description: '' });
      } }
    >
      <label htmlFor="value">
        Valor:
        <input
          type="text"
          data-testid="value-input"
          id="value"
          value={ form.value }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="description">
        Descrição:
        <input
          type="text"
          data-testid="description-input"
          id="description"
          value={ form.description }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="currency">
        Moeda:
        <select
          name="currency"
          id="currency"
          data-testid="currency-input"
          value={ form.currency }
          onChange={ handleChange }
        >
          {carteira.infomoedas
            .map((element) => (
              <option key={ element.code } value={ element.code }>
                {element.code}
                {' '}

              </option>))}
        </select>
      </label>
      <label htmlFor="method">
        Pagamento:
        <select
          name="method"
          id="method"
          data-testid="method-input"
          value={ form.method }
          onChange={ handleChange }
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="cartao-de-credito">Cartão de crédito</option>
          <option value="cartao-de-debito">Cartão de débito</option>
        </select>
      </label>
      <label htmlFor="tag">
        Despesa:
        <select
          name="tag"
          id="tag"
          data-testid="tag-input"
          value={ form.tag }
          onChange={ handleChange }
        >
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saude">Saúde</option>
        </select>
      </label>
      <button>Adicionar despesa</button>
    </form>
  );
}

export default WalletForm;
