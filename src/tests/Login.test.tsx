import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa se existe um formulário na página de login.', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />);
  });
  it('A tela possui um input de e-mail', () => {
    expect(screen.queryByTestId('email-input')).toBeInTheDocument();
  });
  it('A tela possui um input de senha', () => {
    expect(screen.queryByTestId('password-input')).toBeInTheDocument();
  });
  it('A tela possui um botão com o texto "Entrar"', () => {
    expect(screen.queryByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });
  it('O botão "Entrar" só é habilitado quando a senha tem mais de 6 caracteres e o email tem um padrão válido', async () => {
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const buttonEntrar = screen.getByRole('button', { name: /entrar/i });

    expect(buttonEntrar).toBeDisabled();
    await userEvent.type(inputEmail, 'teste@teste.com');
    await userEvent.type(inputPassword, '123456');

    expect(buttonEntrar).not.toBeDisabled();
  });
  it('Ao clicar no botão "Entrar" você é redirecionado para a rota "/carteira"', async () => {
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const buttonEntrar = screen.getByRole('button', { name: /entrar/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonEntrar).toBeInTheDocument();

    await userEvent.type(inputEmail, 'teste@teste.com');
    await userEvent.type(inputPassword, '123456');
    await userEvent.click(buttonEntrar);

    expect(inputEmail).not.toBeInTheDocument();
    expect(inputPassword).not.toBeInTheDocument();
    expect(buttonEntrar).not.toBeInTheDocument();
  });
});
