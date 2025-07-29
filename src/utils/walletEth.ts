import { HDNodeWallet } from 'ethers/wallet';
import { Mnemonic } from 'ethers';
import { generateMnemonic } from 'bip39';

export interface EthWalletAccount {
  index: number;
  publicKey: string;  
  privateKey: string;
}

export interface EthWalletData {
  mnemonic: string;
  accounts: EthWalletAccount[];
}


export const createEthAccount = (): EthWalletData => {
  const mnemonic = generateMnemonic();
  const accounts = [deriveEthAccount(mnemonic, 0)];
  return { mnemonic, accounts };
};


export const addEthAccount = (
  mnemonic: string,
  existingAccounts: EthWalletAccount[]
): EthWalletAccount => {
  const nextIndex = existingAccounts.length;
  return deriveEthAccount(mnemonic, nextIndex);
};


export const deriveEthAccount = (
  mnemonic: string,
  index: number
): EthWalletAccount => {
  const mnemonicObj = Mnemonic.fromPhrase(mnemonic);
  const hdNode = HDNodeWallet.fromMnemonic(mnemonicObj, `m/44'/60'/0'/0/${index}`);

  return {
    index,
    publicKey: hdNode.address,
    privateKey: hdNode.privateKey,
  };
};
