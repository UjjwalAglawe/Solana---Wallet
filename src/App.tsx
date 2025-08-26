import { Routes,Route } from 'react-router-dom';
import {  Solana } from './components/Solana';
import { Home } from './components/Home';
import { Eth } from './components/Eth';

function App() {
  

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
