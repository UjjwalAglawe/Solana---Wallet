import { useNavigate } from 'react-router-dom'
import wallet2 from '../assets/wallet2.svg'

export const Navbar = () => {
    const navigate=useNavigate();
    return (
        <div className="flex items-center gap-4 px-25 py-4 bg-gradient-to-b from-slate-700 to-slate-900 w-full">
            <h1 onClick={()=>{navigate('/')}} className="font-barlow font-bold text-3xl text-white tracking-wide cursor-pointer">U-Wal</h1>
            <img src={wallet2} alt="Wallet Icon" className="w-10 h-10" />
        </div>

    )
}