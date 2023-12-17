import './App.css';
import Header from './components/Header'
import Home from './components/Home';
import Auth from './components/Auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <div className="App">
            <Header />
            <Home />
          </div>
        }></Route>
        <Route path='/login' element={<Auth action={'login'} />}></Route>
        <Route path='/signup' element={<Auth action={'register'} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
