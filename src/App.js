import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import Header from './components/Header'
import Home from './components/Home';
import Auth from './components/Auth';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute />}>
          <Route path='/' element={
            <div className="App">
              <Header />
              <Home />
            </div>
          } />
        </Route>
        <Route path='/login' element={<Auth action={'signin'} />}></Route>
        <Route path='/signup' element={<Auth action={'signup'} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
