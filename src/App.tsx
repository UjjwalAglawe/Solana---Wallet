import { useState } from 'react';
import { createAccount, addAccount } from './utils/wallet';
import type { WalletAccount } from './utils/wallet';
import { Navbar } from './components/Navbar';

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
      <Navbar />

      <div className="bg-slate-900 py-10 px-8 min-h-screen">
        <div className="max-w-5xl mx-auto mt-4">
          <h1 className="font-barlow text-5xl font-bold text-white px-3 py-6 leading-tight">
            Use <span className="text-indigo-400">U-Wal</span> to create wallets quickly
          </h1>


          {!mnemonic ? (
            <div
              onClick={handleCreateWallet}
              className="mt-6 text-white text-center w-fit px-6 py-3 font-bold text-xl rounded-2xl cursor-pointer bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Create Account
            </div>
          ) : (
            <div
              onClick={handleAddAccount}
              className="mt-6 text-white text-center w-fit px-6 py-3 font-bold text-xl rounded-2xl cursor-pointer bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Add Account
            </div>
          )}


          {mnemonic && (
            <div className="mt-10">
              <h3
                onClick={() => setShowMnemonic(!showMnemonic)}
                className="text-white text-2xl font-semibold cursor-pointer border-2 border-slate-600 rounded-xl px-6 py-3 w-fit hover:bg-slate-800 transition duration-300"
              >
                {showMnemonic ? 'Hide Mnemonic' : 'Show Mnemonic'}
              </h3>


              {showMnemonic && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6 transition-all duration-500">
                  {mnemonic.split(' ').map((word, index) => (
                    <div
                      key={index}
                      className="bg-slate-800 text-white font-medium text-center py-2 px-4 rounded-lg border border-slate-700 shadow-inner transition duration-300 hover:bg-slate-700"
                    >
                      <span className="text-slate-400 mr-1">
                        {String(index + 1).padStart(2, '0')}.
                      </span>
                      {word}
                    </div>
                  ))}
                </div>
              )}


              <div className="mt-10 space-y-4">
                {accounts.map((acc) => (
                  <div
                    key={acc.index}
                    className="bg-slate-800 text-white p-4 rounded-xl border border-slate-700 shadow-md transition duration-300 hover:scale-[1.01]"
                  >
                    <h4 className="text-lg font-semibold mb-1">
                      Account #{acc.index}
                    </h4>
                    <p className="text-sm">
                      <b>Public Key:</b> {acc.publicKey}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
