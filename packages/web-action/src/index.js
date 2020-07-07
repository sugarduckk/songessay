import React from 'react';
import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import 'firebase-wrapper';

const rootNode = document.getElementById("container");
ReactDOM.render(<App />, rootNode);