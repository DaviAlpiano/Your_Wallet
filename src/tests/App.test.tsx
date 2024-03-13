import { fireEvent, screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

const testEmail = 'ronaldo@gmail.com';
const testSenha = '123456';

describe('01 - Testando a tela de login.', () => {
  it('Encontrar os elementos login e senha.', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByRole('textbox', { name: /email:/i });
    const senha = screen.getByLabelText(/senha:/i);

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });

  it('Existe o botão de login na página.', () => {
    renderWithRouterAndRedux(<App />);

    const buttaoLogin = screen.getByRole('button', { name: /entrar/i });

    expect(buttaoLogin).toBeInTheDocument();
  });

  it('O botão esta desabilitado sem as informações corretas de login.', () => {
    renderWithRouterAndRedux(<App />);

    const buttaoLogin = screen.getByRole('button', { name: /entrar/i });
    const email = screen.getByRole('textbox', { name: /email:/i });
    const senha = screen.getByLabelText(/senha:/i);

    expect(buttaoLogin).toBeDisabled();

    fireEvent.change(email, { target: { value: testEmail } });
    fireEvent.change(senha, { target: { value: testSenha } });

    expect(buttaoLogin).not.toBeDisabled();

    fireEvent.change(senha, { target: { value: '12345' } });
    expect(buttaoLogin).toBeDisabled();

    fireEvent.change(email, { target: { value: 'ronaldogmail.com' } });
    fireEvent.change(senha, { target: { value: testSenha } });

    expect(buttaoLogin).toBeDisabled();
  });

  it('Ao inserir os dados corretor e clicar no botao de entrar, é redirecionado pra pagina wallet.', async () => {
    renderWithRouterAndRedux(<App />);

    const buttaoLogin = screen.getByRole('button', { name: /entrar/i });
    const email = screen.getByRole('textbox', { name: /email:/i });
    const senha = screen.getByLabelText(/senha:/i);

    fireEvent.change(email, { target: { value: testEmail } });
    fireEvent.change(senha, { target: { value: testSenha } });

    await userEvent.click(buttaoLogin);

    const buttaoDespesa = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(buttaoDespesa).toBeInTheDocument();
  });
});

describe('2 - Testando a página wallet.', () => {
  it('Ao entrar na páginda, é mostrado o email do usuario e o dinheiro total gasto em real.', async () => {
    renderWithRouterAndRedux(<App />);

    const buttaoLogin = screen.getByRole('button', { name: /entrar/i });
    const email = screen.getByRole('textbox', { name: /email:/i });
    const senha = screen.getByLabelText(/senha:/i);

    fireEvent.change(email, { target: { value: 'ronaldo@gmail.com' } });
    fireEvent.change(senha, { target: { value: '123456' } });

    await userEvent.click(buttaoLogin);

    const emailInfo = screen.getByRole('heading', { name: /ronaldo@gmail.com/i });
    const valorTotal = screen.getByRole('heading', { name: /0\.00/i });

    expect(emailInfo).toBeInTheDocument();
    expect(valorTotal).toBeInTheDocument();
  });

  it('São encontrados os componentes pra adicionar as despesas.', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const valor = screen.getByRole('textbox', { name: /valor:/i });
    const descricao = screen.getByRole('textbox', { name: /descrição:/i });
    const moeda = screen.getByRole('combobox', { name: /moeda:/i });
    const pagamento = screen.getByRole('combobox', { name: /pagamento:/i });
    const categoria = screen.getByRole('combobox', { name: /categoria:/i });
    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(valor).toBeInTheDocument();
    expect(descricao).toBeInTheDocument();
    expect(moeda).toBeInTheDocument();
    expect(pagamento).toBeInTheDocument();
    expect(categoria).toBeInTheDocument();
    expect(buttonAdd).toBeInTheDocument();
  });

  it('Ao clicar no botão adicionar despesa, ela é adicionada na tabela e mostrada na tela', async () => {
    const mockResposta = {
      json: async () => mockData,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValue(mockResposta);

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const valor = screen.getByRole('textbox', { name: /valor:/i });
    await userEvent.type(valor, '5');
    const descricao = screen.getByRole('textbox', { name: /descrição:/i });
    await userEvent.type(descricao, 'almoço');

    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });

    await userEvent.click(buttonAdd);

    const tabDescricao = screen.getByRole('cell', { name: /almoço/i });
    const tabValor = screen.getByRole('cell', { name: /5\.00/i });

    expect(tabDescricao).toBeInTheDocument();
    expect(tabValor).toBeInTheDocument();
  });
});
