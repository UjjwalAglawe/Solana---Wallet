import { useNavigate } from "react-router-dom"
import { Navbar } from "./Navbar"

export const Home = () => {
    const navigate=useNavigate();

    return (
        <>
            <Navbar />
            <div className="bg-slate-900 py-10 px-8 min-h-screen">
                <div className="max-w-5xl mx-auto mt-4">
                    <h1 className="font-barlow text-5xl font-bold text-white px-3 py-6 leading-tight">
                        Use <span className="text-indigo-400">U-Wal</span> to create wallets quickly
                    </h1>

                    <div className="flex gap-8">
                        <button onClick={()=>{
                            navigate('/sol')
                        }}
                            className="mt-6 text-white text-center w-fit px-6 py-3 font-bold text-xl rounded-2xl cursor-pointer bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                            Solana
                        </button>

                        <button onClick={()=>{
                            navigate('/eth')
                        }}
                            className="mt-6 text-white text-center w-fit px-6 py-3 font-bold text-xl rounded-2xl cursor-pointer bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                            Ethereum
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}