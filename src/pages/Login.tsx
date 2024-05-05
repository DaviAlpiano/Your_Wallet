import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dispatch, User } from '../types';
import { actionUser } from '../redux/actions';
import styles from './Login.module.css';

function Login() {
  const navigate = useNavigate();
  const dispach:Dispatch = useDispatch();
  const [buttonAble, setButtonAble] = useState<boolean>(true);
  const [form, setForm] = useState<User>({
    email: '',
    senha: '',
  });

  useEffect(() => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regexEmail.test(form.email) && form.senha.length >= 6) {
      setButtonAble(false);
    } else {
      setButtonAble(true);
    }
  }, [form]);

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { id, value } = target;
    setForm({ ...form, [id]: value });
  };

  return (
    <div className={ styles.container }>
      <h2> &#x1F4B8; Your Wallet &#x1F4B8;</h2>
      <form
        className={ styles.form }
        onSubmit={ (e) => {
          e.preventDefault();
          dispach(actionUser(form));
          navigate('/carteira');
        } }
      >
        <label htmlFor="email">
          Email:
          <input
            type="text"
            placeholder="email"
            onChange={ handleChange }
            data-testid="email-input"
            id="email"
            required
          />
        </label>
        <label htmlFor="senha">
          Senha:
          <input
            type="password"
            placeholder="senha"
            onChange={ handleChange }
            data-testid="password-input"
            id="senha"
            required
          />
        </label>
        <button className={ styles.button } disabled={ buttonAble }>Entrar</button>
      </form>
      <div className={ styles.a }>
        <a target="_blank" href="https://br.freepik.com/vetores-gratis/pequeno-empresario-com-pe-de-luneta-na-pilha-de-moedas-aumento-de-ilustracao-vetorial-plana-de-renda-crescimento-financeiro-investimento-conceito-de-sucesso-para-banner-design-de-site-ou-pagina-de-destino_28480857.htm#page=3&query=investimento%20desenho&position=0&from_view=keyword&track=ais&uuid=de4f19fd-6799-4ef1-b4a6-c47d613a5051" rel="noreferrer">Imagem de pch.vector</a>
        {' '}
        no Freepik
      </div>
    </div>
  );
}

export default Login;
