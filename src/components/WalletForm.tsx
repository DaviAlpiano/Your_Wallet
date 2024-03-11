import { useDispatch, useSelector } from "react-redux";
import { Dispatch, InfoDespesa, InfoMoedas} from "../types";
import { useEffect, useState } from "react";
import { addDespesa, fetchmoedas } from "../redux/actions";

function WalletForm() {
  const carteira = useSelector((state:InfoMoedas) => state.wallet);
  const dispatch:Dispatch = useDispatch();
  const [form, setForm] = useState<InfoDespesa>({
    valor: '',
    descrição: '',
    moeda: '',
    pagamento: '',
    despesa: '',
    id: 0,
    exchangeRates: {},
  });

  const tamanhoId = carteira.expenses.length - 1;

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { id, value } = target;
    setForm({ ...form, [id]: value,
      id: carteira.expenses[tamanhoId].id? carteira.expenses[tamanhoId].id + 1 : 0,
      exchangeRates: carteira.currencies.map((element) => element),
    }); 
  };

  useEffect(() => {
    dispatch(fetchmoedas());
  }, [])
  
  return (
    <form
      onSubmit={ (e) => {
        e.preventDefault();
        dispatch(fetchmoedas());
        dispatch(addDespesa(form));
      } }
    >
      <label htmlFor="valor">
        Valor:
        <input
          type="text"
          data-testid="value-input"
          id="valor"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="descrição">
        Descrição:
        <input
          type="text"
          data-testid="value-input"
          id="descrição"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="moeda">
        Moeda:
        <select 
        name="moeda"
        id="moeda"
        data-testid="currency-input"
        onChange={ handleChange }
        >
          {carteira.currencies
          .map((element) => 
          <option 
          key={element.code} 
          value={element.code}>{element.code}
          </option>)}
        </select>
      </label>
      <label htmlFor="pagamento">
        Pagamento:
        <select
        name="pagamento"
        id="pagamento"
        data-testid="method-input"
        onChange={ handleChange }
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="cartao-de-credito">Cartão de crédito</option>
          <option value="cartao-de-debito">Cartão de débito</option>
        </select>
      </label>
      <label htmlFor="despesa">
        Despesa:
        <select
        name="despesa"
        id="despesa"
        data-testid="tag-input"
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
