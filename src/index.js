import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store } from './utils/redux/store'
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Board } from './components/Board/Board';
import { TrelloList } from './components/Board/TrelloList';
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      {/* <App /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Board" element={<Board />} />
          <Route path="/TrelloList/:i" element={<TrelloList />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
