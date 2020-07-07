import React from 'react';
import ReactDOM from "react-dom";
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

const rootNode = document.getElementById("container");
ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, rootNode);