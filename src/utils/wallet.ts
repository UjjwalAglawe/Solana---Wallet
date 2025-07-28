import { Keypair } from "@solana/web3.js";
import { generateMnemonic , mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";


export interface WalletAccount{
    index: number;
    publicKey: string;
    secretKey: Uint8Array;
}

export interface WalletData{
    mnemonic:string;
    accounts:WalletAccount[];
}

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