import { fireEvent, screen } from "@testing-library/dom";
import userEvent from '@testing-library/user-event';
import App from "../App"
import { renderWithRouterAndRedux } from "./helpers/renderWith"

describe('01 - Testando a tela de login.', () => {
    it('Encontrar os elementos login e senha.', () => {
        renderWithRouterAndRedux(<App/>);

        const email = screen.getByRole('textbox', {  name: /email:/i});
        const senha = screen.getByLabelText(/senha:/i);

        expect(email).toBeInTheDocument();
        expect(senha).toBeInTheDocument();
    });

    it('Existe o botão de login na página.', () => {
        renderWithRouterAndRedux(<App/>);

        const buttaoLogin = screen.getByRole('button', {  name: /entrar/i});

        expect(buttaoLogin).toBeInTheDocument();
    });

    it('O botão esta desabilitado sem as informações corretas de login.', () => {
        renderWithRouterAndRedux(<App/>);

        const buttaoLogin = screen.getByRole('button', {  name: /entrar/i});
        const email = screen.getByRole('textbox', {  name: /email:/i});
        const senha = screen.getByLabelText(/senha:/i);

        expect(buttaoLogin).toBeDisabled();

        fireEvent.change(email, {target:{ value : 'ronaldo@gmail.com' } });
        fireEvent.change(senha, {target:{ value : '123456' } });

        expect(buttaoLogin).not.toBeDisabled();

        fireEvent.change(senha, {target:{ value : '12345' } });
        expect(buttaoLogin).toBeDisabled();

        fireEvent.change(email, {target:{ value : 'ronaldogmail.com' } });
        fireEvent.change(senha, {target:{ value : '123456' } });

        expect(buttaoLogin).toBeDisabled();
    });

    it('Ao inserir os dados corretor e clicar no botao de entrar, é redirecionado pra pagina wallet', async () => {
        renderWithRouterAndRedux(<App/>);

        const buttaoLogin = screen.getByRole('button', {  name: /entrar/i});
        const email = screen.getByRole('textbox', {  name: /email:/i});
        const senha = screen.getByLabelText(/senha:/i);

        fireEvent.change(email, {target:{ value : 'ronaldo@gmail.com' } });
        fireEvent.change(senha, {target:{ value : '123456' } });
        
        await userEvent.click(buttaoLogin);

        const buttaoDespesa = screen.getByRole('button', {  name: /adicionar despesa/i});

        expect(buttaoDespesa).toBeInTheDocument();
    });
})