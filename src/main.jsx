import 'font-awesome/scss/font-awesome.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import DetailPage from './components/DetailPage';
import MainPage from './components/MainPage';
import './scss/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<App />}>
          <Route
            index
            element={<MainPage />}

          />
          <Route
            path='details/:ccode'
            element={<DetailPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
