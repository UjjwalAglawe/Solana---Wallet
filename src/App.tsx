import { useState } from 'react';
import { createAccount, addAccount } from './utils/wallet';
import type { WalletAccount } from './utils/wallet';
import { Navbar } from './components/Navbar';
import { Routes,Route } from 'react-router-dom';
import {  Solana } from './components/Solana';
import { Home } from './components/Home';
import { Eth } from './components/Eth';

function App() {
  const [mnemonic, setMnemonic] = useState('');
  const [accounts, setAccounts] = useState<WalletAccount[]>([]);
  const [showMnemonic, setShowMnemonic] = useState(false);

  const handleCreateWallet = () => {
    const { mnemonic, accounts } = createAccount();
    setMnemonic(mnemonic);
    setAccounts(accounts);
  };

  const handleAddAccount = () => {
    if (!mnemonic) return alert('Create a wallet first!');
    const newAccount = addAccount(mnemonic, accounts);
    setAccounts([...accounts, newAccount]);
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sol' element={<Solana/>}/>
        <Route path='/eth' element={<Eth/>}/>
      </Routes>
    </>
  );
}

export default App;
