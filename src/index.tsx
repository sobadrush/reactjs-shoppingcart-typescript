import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// TO FIX: Error: Invariant failed: You should not use <Link> outside a <Router>
import { BrowserRouter, HashRouter, Route } from 'react-router-dom'

/**
 * 原本長這樣
 */
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

/**
 * 改這樣:
 * TO FIX: Error: Invariant failed: You should not use <Link> outside a <Router>
 * ref. https://blog.csdn.net/Jane_96/article/details/84754823?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param
 */
ReactDOM.render(
  (
    <HashRouter>
      <Route path="/" component={App}></Route>
    </HashRouter>
  ),
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
