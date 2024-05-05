import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import styles from './Wallet.module.css';

function Wallet() {
  return (
    <div className={ styles.wallet }>
      <div className={ styles.header }>
        <Header />
        <WalletForm />
      </div>
      <div className={ styles.tablel }>
        <Table />
      </div>
    </div>
  );
}

export default Wallet;
