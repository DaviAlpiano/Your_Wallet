import { useSelector } from "react-redux";
import { User } from "../types";

type infoUser = {
  user: User
}

function Header() {
  const infoUser = useSelector((state: infoUser) => state.user);

  return (
    <header>
    <h3 data-testid="email-field">{ infoUser.email }</h3>
    <h3 data-testid="total-field">0</h3>
    <h3 data-testid="header-currency-field">BRL</h3>
    </header>
  );
}

export default Header;
