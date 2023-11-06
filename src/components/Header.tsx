import { useSelector } from 'react-redux';
import { ReducerType } from '../types';
import styles from '../App.module.css';

function Header() {
  const { user: { email }, wallet: { expenses } } = useSelector(
    (state: ReducerType) => state,
  );

  const totalExpenses = () => {
    let result = 0;
    if (expenses.length > 0) {
      result = expenses.map(({ exchangeRates, value, currency }) => (
        parseFloat(exchangeRates[currency].ask) * parseFloat(value)))
        .reduce((acc, curr) => { return acc + curr; });
    }
    return result.toFixed(2);
  };

  return (
    <header className={ styles.header }>
      <img
        src="../../src/images/trybe-logo.png"
        alt="logo-trybe"
        width={ 120 }
      />
      <div className={ styles.lateralContainer }>
        <p className={ styles.email } data-testid="email-field">{`Email: ${email} `}</p>
        <p style={ { paddingRight: 3 } }>Despesa Total:</p>
        <p data-testid="total-field">
          {totalExpenses()}
        </p>
        <p style={ { paddingLeft: 3 } } data-testid="header-currency-field"> BRL</p>
      </div>
    </header>
  );
}

export default Header;
