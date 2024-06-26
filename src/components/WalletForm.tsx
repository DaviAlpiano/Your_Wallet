import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Dispatch, InfoDespesa, InfoMoedas } from '../types';
import { addDespesa, fetchmoedas } from '../redux/actions';
import styles from './Wallet.module.css';

function WalletForm() {
  const carteira = useSelector((state:InfoMoedas) => state.wallet);
  const dispatch:Dispatch = useDispatch();
  const [form, setForm] = useState<InfoDespesa>({
    value: '',
    currency: 'USD',
    method: 'dinheiro',
    tag: 'alimentacao',
    description: '',
    id: 0,
    exchangeRates: {},
  });

  const tamanhoId = carteira.expenses.length;

  const handleChange = (
    { target }:
    React.ChangeEvent<HTMLInputElement> |
    React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { id, value } = target;
    if (carteira.editor) {
      setForm({ ...form,
        [id]: value,
        id: carteira.idToEdit,
        exchangeRates: carteira.fetchraiz,
      });
    } else {
      setForm({ ...form,
        [id]: value,
        id: tamanhoId,
        exchangeRates: carteira.fetchraiz,
      });
    }
  };

  useEffect(() => {
    dispatch(fetchmoedas());
  }, [dispatch]);

  return (
    <form
      className={ styles.form }
      onSubmit={ (e) => {
        e.preventDefault();
        dispatch(fetchmoedas());
        dispatch(addDespesa(form));
        setForm({ ...form, value: '', description: '' });
      } }
    >
      <div className={ styles.desc }>
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
        <label htmlFor="tag">
          Categoria:
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            value={ form.tag }
            onChange={ handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
      <div className={ styles.value }>
        <label htmlFor="value">
          Valor:
          <input
            required
            type="text"
            data-testid="value-input"
            id="value"
            value={ form.value }
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
              .filter((moeda) => moeda.codein !== 'BRLT')
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
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
      </div>
      <button
        className={ styles.but }
      >
        {carteira.editor ? 'Editar despesa' : 'Adicionar despesa'}
      </button>
    </form>
  );
}

export default WalletForm;
