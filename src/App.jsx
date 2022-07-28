import "./App.css";
import React from "react";
import { SinginPage } from './views/Singin'
import { store } from './utils/redux/store'
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Board } from './components/Board/Board';
import { MainPage } from './components/MainPage/MainPage';

function App() {
  return (
    <div>
      <Provider store={store}>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SinginPage />} />
            <Route path="/Board" element={<Board />} />
            <Route path="/MainPage/:i" element={<MainPage />} />
          </Routes>
        </BrowserRouter>

      </Provider>,
    </div>
  );
}

export default App;