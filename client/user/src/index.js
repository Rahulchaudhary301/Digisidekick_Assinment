import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from './App';
import SingUp from './Page/SingUp';
import Loging from './Page/Loging';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Router>
    
       <Routes>
         
          <Route exact path='/home' element={<App/>}/>
          <Route exact path='/sinup' element={<SingUp/>}/>
          <Route exact path='/' element={<Loging/>}/>

          <Route exact path='/*' element={<h1>Page not found</h1>}/>

       </Routes>
    </Router>
  </>
);


