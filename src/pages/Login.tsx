import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from '../App.module.css';
import { actionUser } from '../redux/actions';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  const validateBtn = (
    currentEmail: string,
    currentPassword: string,
  ) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(currentEmail) && currentPassword.length >= 6;

  const handleChange = (event :React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    if (name === 'email') {
      setLogin(value);
      if (validateBtn(value, password)) setBtnDisabled(false);
      else setBtnDisabled(true);
    }
    if (name === 'password') {
      setPassword(value);
      if (validateBtn(login, value)) setBtnDisabled(false);
      else setBtnDisabled(true);
    }
  };

  const handleBtnEntrar = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    dispatch(actionUser({ email: login }));
    navigate('/carteira');
  };

  return (
    <div className={ styles.main }>
      <div className={ styles.container }>
        <img src="../../src/images/trybe-logo.png" alt="logo-trybe" width={ 140 } />
        <form className={ styles.form }>
          <input
            className={ styles.input }
            value={ login }
            placeholder="e-mail"
            type="email"
            name="email"
            id="email"
            data-testid="email-input"
            onChange={ (event) => handleChange(event) }
          />
          <input
            className={ styles.input }
            value={ password }
            placeholder="senha"
            type="password"
            name="password"
            id="password"
            data-testid="password-input"
            onChange={ (event) => handleChange(event) }
          />
          <button
            className={ styles.button }
            disabled={ btnDisabled }
            onClick={ (event) => handleBtnEntrar(event) }
          >
            Entrar

          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
