import { useDispatch, useSelector } from 'react-redux';
import { InfoMoedas } from '../types';
import { editDespesa, removeDespesa } from '../redux/actions';

function Table() {
  const despesas = useSelector((state:InfoMoedas) => state.wallet.expenses);
  const dispatch = useDispatch();

  const handleChange = ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = currentTarget;
    dispatch(removeDespesa(id));
  };

  const handleClick = ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = currentTarget;
    dispatch(editDespesa(parseInt(id, 10)));
  };

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
            const idBut = despesa.id.toString();
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
                  <button
                    data-testid="edit-btn"
                    id={ idBut }
                    onClick={ handleClick }
                  >
                    Editar
                  </button>
                  <button
                    id={ idBut }
                    onClick={ handleChange }
                    data-testid="delete-btn"
                  >
                    Excluir
                  </button>
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
