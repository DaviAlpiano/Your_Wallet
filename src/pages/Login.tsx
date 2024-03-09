import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { User } from '../types';
import { actionUser } from '../redux/actions';

function Login() {
  const navigate = useNavigate();
  const dispach = useDispatch();
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
    <form
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
      <button disabled={ buttonAble }>Entrar</button>
    </form>
  );
}

export default Login;
