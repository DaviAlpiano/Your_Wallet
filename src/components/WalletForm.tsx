import { useDispatch, useSelector } from "react-redux";
import { Dispatch, Wallet } from "../types";

type InfoMoedas = {
  wallet: Wallet
};

function WalletForm() {
  const rootstate = useSelector((state:InfoMoedas) => state.wallet);
  
  return (
    <form
      onSubmit={ (e) => {
        e.preventDefault();
      } }
    >
      <label htmlFor="valor">
        Valor:
        <input
          type="text"
          data-testid="value-input"
          id="valor"
        />
      </label>
      <label htmlFor="descrição">
        Descrição:
        <input
          type="text"
          data-testid="value-input"
          id="descrição"
        />
      </label>
      <label htmlFor="moeda">
        Moeda:
        <select name="moeda" id="moeda" data-testid="currency-input">
          {rootstate.currencies.map((element) => <option key={element.code} value={element.code}>{element.code}</option>)}
        </select>
      </label>
      <label htmlFor="pagamento">
        Pagamento:
        <select name="pagamento" id="pagamento" data-testid="method-input">
          <option value="dinheiro">Dinheiro</option>
          <option value="cartao-de-credito">Cartão de crédito</option>
          <option value="cartao-de-debito">Cartão de débito</option>
        </select>
      </label>
      <label htmlFor="despesa">
        Despesa:
        <select name="despesa" id="despesa" data-testid="tag-input">
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saude">Saúde</option>
        </select>
      </label>

    </form>
  );
}

export default WalletForm;
