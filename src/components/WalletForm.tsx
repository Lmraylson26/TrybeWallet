import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Dispatch, ReducerType } from '../types';
import styles from '../App.module.css';
import { fetchWallet } from '../redux/actions';

const INITIAL_FORM = {
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
};

function WalletForm() {
  const dispatch: Dispatch = useDispatch();
  const { currencies } = useSelector((state: ReducerType) => state.wallet);
  const [form, setForm] = useState(INITIAL_FORM);
  useEffect(() => {
    dispatch(fetchWallet('array'));
  }, []);

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleExpensesBtn = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    dispatch(fetchWallet(undefined, form));
    setForm(INITIAL_FORM);
  };

  return (
    <main>
      <form className={ styles.formContainer }>
        <label className={ styles.label } htmlFor="expense-value">
          Valor:
          {' '}
          <input
            className={ styles.input }
            type="number"
            name="value"
            data-testid="value-input"
            value={ form.value }
            onChange={ (event) => handleChangeInput(event) }
          />
        </label>

        <label className={ styles.label } htmlFor="coin">
          Moeda:
          {' '}
          <select
            className={ styles.input }
            name="currency"
            data-testid="currency-input"
            value={ form.currency }
            onChange={ (event) => handleChangeInput(event) }
          >
            {
            currencies.map((coin) => (
              <option key={ coin } value={ coin }>{coin}</option>
            ))
          }
          </select>
        </label>

        <label className={ styles.label } htmlFor="payment-method">
          Método de pagamento:
          {' '}
          <select
            className={ styles.input }
            name="method"
            data-testid="method-input"
            value={ form.method }
            onChange={ (event) => handleChangeInput(event) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label className={ styles.label } htmlFor="tag">
          Tag:
          {' '}
          <select
            className={ styles.input }
            name="tag"
            data-testid="tag-input"
            value={ form.tag }
            onChange={ (event) => handleChangeInput(event) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <label className={ styles.label } htmlFor="expense-description">
          Descrição:
          {' '}
          <input
            className={ styles.input }
            type="text"
            name="description"
            data-testid="description-input"
            value={ form.description }
            onChange={ (event) => handleChangeInput(event) }
          />
        </label>
        <button
          className={ styles.buttonMain }
          onClick={ (event) => handleExpensesBtn(event) }
        >
          Adicionar despesa

        </button>
      </form>
    </main>
  );
}

export default WalletForm;
