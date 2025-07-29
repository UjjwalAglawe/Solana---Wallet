import { Keypair } from "@solana/web3.js";
import { generateMnemonic , mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Connection, PublicKey } from '@solana/web3.js';


export interface WalletAccount{
    index: number;
    publicKey: string;
    secretKey: Uint8Array;
}

export interface WalletData{
    mnemonic:string;
    accounts:WalletAccount[];
}

export const getSolBalance = async (publicKey: string): Promise<string> => {
  try {
    const connection = new Connection('https://eth-mainnet.g.alchemy.com/v2/Ub9bKtLmFHitTHFeiZEGD');
    const pubkey = new PublicKey(publicKey);

    const lamports = await connection.getBalance(pubkey);
    const sol = lamports / 1e9;

    return sol.toFixed(6); // 6 decimal places
  } catch (err) {
    console.error('Error fetching SOL balance:', err);
    return 'Error';
  }
};

export const createAccount=() :WalletData =>
{
    const mnemonic=generateMnemonic();
    const seed=mnemonicToSeedSync(mnemonic);
    const accounts=[deriveAccounts(seed,0)];

    return {mnemonic,accounts};
    
}

export const addAccount=(mnemonic:string,createAccount:WalletAccount[]):WalletAccount=>{
    const seed=mnemonicToSeedSync(mnemonic);
    const nextIndex=createAccount.length;
    return deriveAccounts(seed,nextIndex);

}

export const deriveAccounts=(seed:Buffer,index:number):WalletAccount=>{
    const path = `m/44'/501'/${index}'/0'`;
    const deriveSeed=derivePath(path,seed.toString('hex')).key;
    const keypair = Keypair.fromSecretKey(nacl.sign.keyPair.fromSeed(deriveSeed).secretKey);

    return {
        index,
        publicKey:keypair.publicKey.toBase58(),
        secretKey:keypair.secretKey,
    };
};