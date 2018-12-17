import React from 'react';
import ReactDOM from 'react-dom';

// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

var ticker = () => {
  const time = (new Date().toLocaleTimeString());

var formatName = (user) => {
  return user.name + user.email;
}

const user = {
  name: "Name",
  email: "Email",
};


const element = (
  <div>
  <h1>
  Hello {formatName(user)}!
  </h1>
  <p>Now time is {time}</p>
  </div>
  );

ReactDOM.render(
  element,
  document.getElementById("root")
);

}

setInterval(ticker, 1000);