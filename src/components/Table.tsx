import { useSelector } from 'react-redux';
import { InfoMoedas } from '../types';

function Table() {
  const despesas = useSelector((state:InfoMoedas) => state.wallet.expenses);

  return (
    <table border={ 1 }>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {despesas.length > 0 && (
          despesas.map((despesa) => {
            const valor = parseFloat(despesa.value);
            const cambio = parseFloat(despesa.exchangeRates[despesa.currency].ask);
            const convertido = valor * cambio;
            return (
              <tr key={ despesa.id }>
                <td>{despesa.description}</td>
                <td>{despesa.tag}</td>
                <td>{despesa.method}</td>
                <td>{valor.toFixed(2)}</td>
                <td>{despesa.exchangeRates[despesa.currency].name}</td>
                <td>{cambio.toFixed(2)}</td>
                <td>{convertido.toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button>Editar</button>
                  <button>Excluir</button>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}

export default Table;
