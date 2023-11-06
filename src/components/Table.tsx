import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../types';
import { actionWalletSucessRemove } from '../redux/actions';

function Table() {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state: ReducerType) => state.wallet);
  const handleBtnDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    dispatch(actionWalletSucessRemove({ data: parseFloat(event.currentTarget.id) }));
  };

  console.log(useSelector((state: ReducerType) => state.wallet.expenses));
  return (

    <table>
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
      {
        expenses.map(({ id,
          description,
          tag, method,
          value,
          currency,
          exchangeRates,
        }) => (
          <tbody key={ id }>
            <tr>
              <td>{description}</td>
              <td>{ tag }</td>
              <td>{method}</td>
              <td>{`${parseFloat(value).toFixed(2)} ${currency}`}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{`${parseFloat(exchangeRates[currency].ask).toFixed(2)} BRL`}</td>
              <td>
                {`${(parseFloat(exchangeRates[currency].ask)
                * parseFloat(value)).toFixed(2)} BRL`}
              </td>
              <td>{exchangeRates[currency].name.split('/')[1]}</td>
              <td>
                <button>Editar</button>
                <button
                  id={ id.toString() }
                  data-testid="delete-btn"
                  onClick={ (event) => { handleBtnDelete(event); } }
                >
                  Excluir

                </button>
              </td>
            </tr>
          </tbody>
        ))
      }

    </table>
  );
}

export default Table;
