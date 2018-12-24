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

let ticker = () => {
  const time = (new Date().toLocaleTimeString());

  var formatName = (user) => {
    return `${user.name}(${user.email})`;
  }

  const user = {
    name: "jskyzero",
    email: "jskyzero@outlook.com",
  };


  // same to React.createElement()
  const element = (
    <div>
      <h1>Timer!</h1>
      <p local_user={user}>welcome {formatName(user)}</p>
      <p>Now time is {time}</p>
    </div>
  );

  ReactDOM.render(
    element,
    document.getElementById("root")
  );

}

// render will only update changed part
setInterval(ticker, 1000);